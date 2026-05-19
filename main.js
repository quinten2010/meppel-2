import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: 1141, title: 'EPISCOPAL INCEPTION', z: 0 },
  { year: 1422, title: 'TOWER CONSTRUCTION', z: -30 },
  { year: 1460, title: 'MARKET RIGHTS', z: -60 },
  { year: 1644, title: 'CITY SOVEREIGNTY', z: -90 },
  { year: 1742, title: 'JEWISH HERITAGE', z: -120 },
  { year: 1867, title: 'THE IRON ROAD', z: -150 },
  { year: 1942, title: 'THE GREAT VOID', z: -180 },
  { year: 2026, title: 'PORT OF ZWOLLE', z: -210 },
];

class App {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.blocks = [];
    this.scrollProgress = 0;
    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x1a1a2e);
    document.getElementById('app').appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
    
    // Improved lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xffffff, 1.2);
    pointLight1.position.set(5, 5, 10);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x4ECDC4, 0.8);
    pointLight2.position.set(-5, -5, 10);
    this.scene.add(pointLight2);
    
    this.createMilestones();
    this.setupScroll();
    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  createMilestones() {
    const colors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0xFFA07A, 0x98D8C8, 0xF7DC6F, 0xBB8FCE, 0x85C1E2];
    MILESTONES.forEach((m, index) => {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: colors[index], transparent: true, opacity: 0.9, emissive: colors[index], emissiveIntensity: 0.2 })
      );
      block.position.z = m.z;
      block.rotation.x = 0.3;
      block.rotation.y = 0.4;
      this.scene.add(block);
      this.blocks.push(block);
      
      // Position labels below the block
      this.createLabel(m.year.toString(), 0, -3, m.z, 'year');
      this.createLabel(m.title, 0, -3.8, m.z, 'title');
    });
  }

  createLabel(text, x, y, z, type = 'default') {
    const canvas = document.createElement('canvas');
    const isYear = type === 'year';
    const fontSize = isYear ? 64 : 40;
    
    canvas.width = 1024;
    canvas.height = isYear ? 256 : 200;
    const ctx = canvas.getContext('2d');
    
    // Add background for better text visibility
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(isYear ? 6 : 8, isYear ? 1.5 : 1.2),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true })
    );
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
  }

  setupScroll() {
    document.body.style.height = '600vh';
    gsap.to(this, {
      scrollProgress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => { this.scrollProgress = self.progress; }
      }
    });
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.blocks.forEach(b => { b.rotation.y += 0.003; });
    this.camera.position.z = 5 - this.scrollProgress * 220;
    this.renderer.render(this.scene, this.camera);
  }
}

new App();