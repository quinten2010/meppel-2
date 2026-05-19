import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class MeppelTimeline {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.progressBar = document.getElementById('progress-bar');
    this.navDots = document.getElementById('nav-dots');
    this.sections = document.querySelectorAll('.timeline-section');
    this.contents = document.querySelectorAll('.timeline-content');
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentMesh = null;
    this.particles = null;
    this.scrollProgress = 0;
    this.currentIndex = 0;
    
    this.colors = [
      0xff6b9d,
      0xc06c84,
      0x6c567b,
      0x355c7d,
      0x2a9d8f,
      0xe9c46a,
      0xf4a261,
      0xe76f51,
    ];

    this.init();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLights();
    this.createParticles();
    this.createNavDots();
    this.setupScroll();
    this.animate();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050508, 0.035);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x050508, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => this.onResize());
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    this.scene.add(mainLight);

    const accentLight = new THREE.PointLight(0x00d4ff, 0.8, 20);
    accentLight.position.set(-3, 2, 3);
    this.scene.add(accentLight);

    const rimLight = new THREE.PointLight(0xff00ff, 0.6, 20);
    rimLight.position.set(3, -2, 3);
    this.scene.add(rimLight);
  }

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 30;
      velocities[i] = (Math.random() - 0.5) * 0.01;
      velocities[i + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.userData.velocities = velocities;

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createNavDots() {
    for (let i = 0; i < this.sections.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        this.sections[i].scrollIntoView({ behavior: 'smooth' });
      });
      this.navDots.appendChild(dot);
    }
  }

  createMilestoneMesh(index) {
    // Remove old mesh
    if (this.currentMesh) {
      this.scene.remove(this.currentMesh);
      this.currentMesh.geometry.dispose();
      this.currentMesh.material.dispose();
    }

    const color = this.colors[index];
    
    // Create a complex geometry based on index
    let geometry;
    switch (index % 4) {
      case 0:
        geometry = new THREE.IcosahedronGeometry(1.5, 1);
        break;
      case 1:
        geometry = new THREE.OctahedronGeometry(1.5, 1);
        break;
      case 2:
        geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        break;
      case 3:
        geometry = new THREE.DodecahedronGeometry(1.5, 1);
        break;
    }

    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.7,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: 0.3,
      wireframe: false,
    });

    this.currentMesh = new THREE.Mesh(geometry, material);
    this.currentMesh.position.set(0, 0, 0);
    this.currentMesh.scale.set(0, 0, 0);
    this.scene.add(this.currentMesh);

    // Add wireframe overlay
    const wireGeo = geometry.clone();
    const wireMat = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.scale.set(1.1, 1.1, 1.1);
    this.currentMesh.add(wireMesh);

    // Animate entrance
    gsap.to(this.currentMesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    gsap.to(this.currentMesh.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: 'power2.out',
    });
  }

  setupScroll() {
    // Create scroll trigger for each section
    this.sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => this.onSectionEnter(index),
        onEnterBack: () => this.onSectionEnter(index),
      });
    });

    // Progress bar
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        this.scrollProgress = self.progress;
        this.progressBar.style.width = `${self.progress * 100}%`;
        
        // Update nav dots
        const activeIndex = Math.round(self.progress * (this.sections.length - 1));
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      },
    });
  }

  onSectionEnter(index) {
    this.currentIndex = index;
    this.createMilestoneMesh(index);
    
    // Show content
    this.contents.forEach((content, i) => {
      content.classList.toggle('visible', i === index);
    });

    // Hide scroll hint after first section
    if (index > 0) {
      document.querySelector('.scroll-hint').style.opacity = '0';
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate current mesh
    if (this.currentMesh) {
      this.currentMesh.rotation.x += 0.003;
      this.currentMesh.rotation.y += 0.005;
      
      // Subtle floating
      this.currentMesh.position.y = Math.sin(Date.now() * 0.001) * 0.2;
    }

    // Animate particles
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      const velocities = this.particles.geometry.userData.velocities;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        if (Math.abs(positions[i]) > 15) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 15) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 15) velocities[i + 2] *= -1;
      }

      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.rotation.y += 0.0002;
    }

    // Camera subtle movement based on scroll
    this.camera.position.x = Math.sin(this.scrollProgress * Math.PI * 2) * 0.5;
    this.camera.position.y = Math.cos(this.scrollProgress * Math.PI) * 0.3;

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  new MeppelTimeline();
});
