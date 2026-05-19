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
    this.orbitalElements = [];

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
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.getElementById('app').appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.camera.position.set(0, 2, 8);
    this.camera.lookAt(0, 0, 0);
  }

  setupLighting() {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    this.scene.add(ambientLight);

    // Main directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 20, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;
    this.scene.add(dirLight);

    // Right accent light (cyan)
    const rightLight = new THREE.PointLight(0x00d4ff, 0.8);
    rightLight.position.set(25, 5, 10);
    this.scene.add(rightLight);

    // Left accent light (magenta)
    const leftLight = new THREE.PointLight(0xff00ff, 0.6);
    leftLight.position.set(-25, 5, 10);
    this.scene.add(leftLight);

    // Back light
    const backLight = new THREE.PointLight(0x00ffff, 0.5);
    backLight.position.set(0, 0, 25);
    this.scene.add(backLight);
  }

  setupScene() {
    this.scene.fog = new THREE.Fog(0x0a0e27, 80, 300);
  }

  createParticleSystem() {
    const particleCount = 1200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 150;
      positions[i + 1] = (Math.random() - 0.5) * 150;
      positions[i + 2] = (Math.random() - 0.5) * 150;

      velocities[i] = (Math.random() - 0.5) * 0.03;
      velocities[i + 1] = (Math.random() - 0.5) * 0.03;
      velocities[i + 2] = (Math.random() - 0.5) * 0.03;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.userData.velocities = velocities;

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.2,
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
      const zPos = index * -50;

      // Create main showcase block with multiple layers
      this.createShowcaseBlock(milestone, index, zPos, colors[index]);
    });
  }

  createShowcaseBlock(milestone, index, zPos, color) {
    const groupContainer = new THREE.Group();
    groupContainer.position.z = zPos;

    // Layer 1: Inner core with metallic material
    const coreGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.4,
      roughness: 0.3,
      emissive: color,
      emissiveIntensity: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.castShadow = true;
    core.receiveShadow = true;
    core.rotation.x = 0.3;
    core.rotation.y = 0.4;
    groupContainer.add(core);

    // Layer 2: Outer glowing wireframe
    const wireframeGeometry = new THREE.BoxGeometry(3.2, 3.2, 3.2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    wireframe.rotation.x = -0.2;
    wireframe.rotation.y = -0.3;
    groupContainer.add(wireframe);

    // Layer 3: Floating octahedron inside
    const octaGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const octaMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.7,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: 0.4,
      wireframe: false,
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.castShadow = true;
    octahedron.receiveShadow = true;
    octahedron.scale.set(0.8, 0.8, 0.8);
    groupContainer.add(octahedron);

    // Layer 4: Rotating ring elements
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.15, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.6,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = 0.7;
    ring1.castShadow = true;
    ring1.receiveShadow = true;
    groupContainer.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.y = 0.7;
    ring2.castShadow = true;
    ring2.receiveShadow = true;
    groupContainer.add(ring2);

    // Layer 5: Glowing aura sphere
    const auraGeometry = new THREE.IcosahedronGeometry(3.5, 3);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.05,
      wireframe: true,
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    groupContainer.add(aura);

    this.scene.add(groupContainer);

    // Store references for animation
    this.blocks.push({
      container: groupContainer,
      core: core,
      wireframe: wireframe,
      octahedron: octahedron,
      ring1: ring1,
      ring2: ring2,
      aura: aura,
      color: color,
      targetRotation: { x: 0.3, y: 0.4 },
      index: index,
    });

    // Create labels
    this.createEnhancedLabel(milestone, zPos, index);
  }

  createEnhancedLabel(milestone, zPos, index) {
    // Year Enhancement
    const yearCanvas = this.createCanvasTexture(
      `${milestone.year} | ${milestone.title}`,
      {
        fontSize: 60,
        weight: 'bold',
        color: '#ffffff',
        padding: 50,
        maxWidth: 800,
      }
    );

    const labelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 2),
      new THREE.MeshBasicMaterial({
        map: yearCanvas,
        transparent: true,
        opacity: 1,
      })
    );
    labelMesh.position.set(0, 0, zPos + 4.5);
    this.scene.add(labelMesh);

    // Assign label for updates or visibility changes
    this.labels.push({
      label: labelMesh,
      index,
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
    const totalDistance = MILESTONES.length * 50;
    document.body.style.height = `${totalDistance * 30}vh`;

    MILESTONES.forEach((_, index) => {
      const milestoneTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: `#milestone-${index + 1}`,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Add tailored animations for each milestone
      milestoneTrigger.to(this.blocks[index].container.rotation, {
        x: 0.4 * Math.PI,
        duration: 2,
      });
      milestoneTrigger.to(this.blocks[index].container.rotation, {
        y: 0.5 * Math.PI,
        duration: 2,
      }, '<');
    });

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
      block.targetRotation.x = 0.3 + mouseY * 0.2;
      block.targetRotation.y = 0.4 + mouseX * 0.2;
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

        if (Math.abs(positions[i]) > 75) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 75) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 75) velocities[i + 2] *= -1;
      }

      this.particleSystem.geometry.attributes.position.needsUpdate = true;
      this.particleSystem.rotation.x += 0.00005;
      this.particleSystem.rotation.y += 0.00005;
    }

    // Update blocks with enhanced animations
    this.blocks.forEach((block, index) => {
      // Core rotations
      block.core.rotation.x += (block.targetRotation.x - block.core.rotation.x) * 0.05;
      block.core.rotation.y += (block.targetRotation.y - block.core.rotation.y) * 0.05;
      block.core.rotation.z += 0.0002;

      // Counter-rotating wireframe
      block.wireframe.rotation.x -= 0.0003;
      block.wireframe.rotation.y -= 0.0002;
      block.wireframe.rotation.z += 0.0001;

      // Pulsing octahedron
      const pulse = 0.8 + Math.sin(Date.now() * 0.002 + index * 0.5) * 0.15;
      block.octahedron.scale.set(pulse, pulse, pulse);
      block.octahedron.rotation.x += 0.003;
      block.octahedron.rotation.y += 0.004;

      // Rotating rings
      block.ring1.rotation.x += 0.002;
      block.ring1.rotation.y += 0.001;
      block.ring2.rotation.y += 0.0015;
      block.ring2.rotation.z += 0.0008;

      // Aura rotation
      block.aura.rotation.x += 0.0001;
      block.aura.rotation.y += 0.0001;

      // Subtle floating motion
      const float = Math.sin(Date.now() * 0.0008 + index) * 0.3;
      block.container.position.y = float;
    });

    // Enhanced camera movement - orbits and moves dynamically
    const scrollZ = this.scrollProgress * 350;
    const orbitX = Math.sin(this.scrollProgress * Math.PI * 1.5) * 3;
    const orbitY = Math.cos(this.scrollProgress * Math.PI * 0.8) * 2;
    
    this.camera.position.z = 8 + scrollZ;
    this.camera.position.x = orbitX;
    this.camera.position.y = 2 + orbitY;

    // Look slightly ahead
    const lookAhead = scrollZ + 30;
    this.camera.lookAt(0, 0, lookAhead);

    // Update description visibility
    this.labels.forEach((label, i) => {
      const distance = Math.abs(i * 50 - (this.camera.position.z - 8));
      const opacity = Math.max(0, 1 - distance / 25);
      label.description.material.opacity = opacity * 0.85;
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  new PremiumTimeline();
});
