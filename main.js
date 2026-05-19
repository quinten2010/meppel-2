import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: 1141, title: 'EPISCOPAL INCEPTION', description: 'The founding of Meppel as an episcopal settlement' },
  { year: 1422, title: 'TOWER CONSTRUCTION', description: 'The iconic tower was built' },
  { year: 1460, title: 'MARKET RIGHTS', description: 'Granted trading rights and market privileges' },
  { year: 1644, title: 'CITY SOVEREIGNTY', description: 'Achieved independence and self-governance' },
  { year: 1742, title: 'JEWISH HERITAGE', description: 'Cultural and community development' },
  { year: 1867, title: 'THE IRON ROAD', description: 'Railway connection to the region' },
  { year: 1942, title: 'THE GREAT VOID', description: 'A period of historical significance' },
  { year: 2026, title: 'PORT OF ZWOLLE', description: 'Modern revival and transformation' },
];

class PremiumTimeline {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    this.blocks = [];
    this.labels = [];
    this.scrollProgress = 0;
    this.targetScroll = 0;
    this.particleSystem = null;
    this.currentMilestoneIndex = 0;

    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupCamera();
    this.setupLighting();
    this.setupScene();
    this.createParticleSystem();
    this.createMilestones();
    this.setupScrollTrigger();
    this.setupEventListeners();
    this.animate();
  }

  setupRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x0a0e27, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    document.getElementById('app').appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.camera.position.set(0, 0, 8);
    this.camera.lookAt(0, 0, 0);
  }

  setupLighting() {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Main directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;
    this.scene.add(dirLight);

    // Right accent light (cyan)
    const rightLight = new THREE.PointLight(0x00d4ff, 0.6);
    rightLight.position.set(15, 0, 5);
    this.scene.add(rightLight);

    // Left accent light (magenta)
    const leftLight = new THREE.PointLight(0xff00ff, 0.4);
    leftLight.position.set(-15, 0, 5);
    this.scene.add(leftLight);

    // Back light
    const backLight = new THREE.PointLight(0xffffff, 0.3);
    backLight.position.set(0, 0, 15);
    this.scene.add(backLight);
  }

  setupScene() {
    this.scene.fog = new THREE.Fog(0x0a0e27, 50, 200);
  }

  createParticleSystem() {
    const particleCount = 800;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      velocities[i] = (Math.random() - 0.5) * 0.05;
      velocities[i + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i + 2] = (Math.random() - 0.5) * 0.05;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.userData.velocities = velocities;

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
    });

    this.particleSystem = new THREE.Points(particles, material);
    this.scene.add(this.particleSystem);
  }

  createMilestones() {
    const colors = [
      0xff6b9d,
      0xc06c84,
      0x6c567b,
      0x355c7d,
      0x2a9d8f,
      0xe9c46a,
      0xf4a261,
      0xe76f51,
    ];

    MILESTONES.forEach((milestone, index) => {
      const zPos = index * -40;

      // Create main cube with premium material
      const geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
      const material = new THREE.MeshStandardMaterial({
        color: colors[index],
        metalness: 0.3,
        roughness: 0.4,
        emissive: colors[index],
        emissiveIntensity: 0.2,
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.z = zPos;
      cube.position.y = 0;
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.rotation.x = 0.4;
      cube.rotation.y = 0.5;
      cube.userData.color = colors[index];
      cube.userData.targetRotation = { x: 0.4, y: 0.5 };

      this.scene.add(cube);
      this.blocks.push(cube);

      // Create glowing outline
      const outlineGeometry = new THREE.BoxGeometry(3.8, 3.8, 3.8);
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: colors[index],
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
      outline.position.copy(cube.position);
      outline.rotation.copy(cube.rotation);
      this.scene.add(outline);

      // Create floating text label
      this.createEnhancedLabel(
        milestone,
        zPos,
        index
      );
    });
  }

  createEnhancedLabel(milestone, zPos, index) {
    // Year label
    const yearCanvas = this.createCanvasTexture(
      milestone.year.toString(),
      {
        fontSize: 72,
        weight: 'bold',
        color: '#ffffff',
        padding: 40,
      }
    );

    const yearMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 1.2),
      new THREE.MeshBasicMaterial({
        map: yearCanvas,
        transparent: true,
      })
    );
    yearMesh.position.set(0, 2, zPos);
    yearMesh.castShadow = false;
    this.scene.add(yearMesh);

    // Title label
    const titleCanvas = this.createCanvasTexture(
      milestone.title,
      {
        fontSize: 42,
        weight: 'bold',
        color: '#ffffff',
        padding: 30,
      }
    );

    const titleMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 1),
      new THREE.MeshBasicMaterial({
        map: titleCanvas,
        transparent: true,
      })
    );
    titleMesh.position.set(0, 0.5, zPos);
    titleMesh.castShadow = false;
    this.scene.add(titleMesh);

    // Description label (only for selected milestone)
    const descriptionCanvas = this.createCanvasTexture(
      milestone.description,
      {
        fontSize: 20,
        weight: 'normal',
        color: '#aaaaaa',
        padding: 20,
        maxWidth: 400,
      }
    );

    const descriptionMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 1.2),
      new THREE.MeshBasicMaterial({
        map: descriptionCanvas,
        transparent: true,
        opacity: 0,
      })
    );
    descriptionMesh.position.set(0, -1.5, zPos);
    descriptionMesh.castShadow = false;
    this.scene.add(descriptionMesh);

    this.labels.push({
      year: yearMesh,
      title: titleMesh,
      description: descriptionMesh,
    });
  }

  createCanvasTexture(text, options = {}) {
    const {
      fontSize = 48,
      weight = 'normal',
      color = '#ffffff',
      padding = 20,
      maxWidth = 300,
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 256;

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${weight} ${fontSize}px 'Inter', 'Helvetica', sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = this.wrapText(ctx, text, maxWidth);
    const lineHeight = fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvas.height - totalHeight) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;

    return texture;
  }

  wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
  }

  setupScrollTrigger() {
    const totalDistance = MILESTONES.length * 40;
    document.body.style.height = `${totalDistance * 30}vh`;

    gsap.to(this, {
      scrollProgress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          this.scrollProgress = self.progress;
          this.targetScroll = self.progress * totalDistance;
        },
      },
    });
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    this.blocks.forEach((block) => {
      block.userData.targetRotation.x = 0.4 + mouseY * 0.3;
      block.userData.targetRotation.y = 0.5 + mouseX * 0.3;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Update particles
    if (this.particleSystem) {
      const positions = this.particleSystem.geometry.attributes.position.array;
      const velocities = this.particleSystem.geometry.userData.velocities;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Wrap around
        if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 50) velocities[i + 2] *= -1;
      }

      this.particleSystem.geometry.attributes.position.needsUpdate = true;
      this.particleSystem.rotation.x += 0.0001;
      this.particleSystem.rotation.y += 0.0001;
    }

    // Update blocks
    this.blocks.forEach((block, index) => {
      block.rotation.x += (block.userData.targetRotation.x - block.rotation.x) * 0.05;
      block.rotation.y += (block.userData.targetRotation.y - block.rotation.y) * 0.05;
      block.rotation.z += 0.0003;

      // Subtle scale animation
      const baseScale = 1;
      const distance = Math.abs(block.position.z - (this.camera.position.z + this.targetScroll));
      const scale = baseScale + Math.sin(Date.now() * 0.001 + index) * 0.02;
      block.scale.set(scale, scale, scale);
    });

    // Update camera based on scroll
    this.camera.position.z = 8 + this.scrollProgress * 280;
    this.camera.position.y = Math.sin(this.scrollProgress * Math.PI * 2) * 2;

    // Update description visibility based on proximity to milestone
    const currentMilestoneZ = Math.round(this.camera.position.z / 40) * 40;
    const milestoneIndex = Math.round(this.camera.position.z / 40);

    this.labels.forEach((label, i) => {
      const distance = Math.abs(i * 40 - this.camera.position.z + 8);
      const opacity = Math.max(0, 1 - distance / 20);
      label.description.material.opacity = opacity * 0.8;
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  new PremiumTimeline();
});
