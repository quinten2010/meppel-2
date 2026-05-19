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
    this.renderer.setClearColor(0xA0A5B1);
    document.getElementById('app').appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
    
    this.scene.add(new THREE.AmbientLight(0xffffff, 1));
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    this.scene.add(light);
    
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
        new THREE.MeshStandardMaterial({ color: colors[index], transparent: true, opacity: 0.8 })
      );
      block.position.z = m.z;
      block.rotation.x = 0.3;
      block.rotation.y = 0.4;
      this.scene.add(block);
      this.blocks.push(block);
      
      this.createLabel(m.year.toString(), 0, -1.8, m.z);
      this.createLabel(m.title, 0, -2.5, m.z);
    });
  }

  createLabel(text, x, y, z) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 64);
    
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 0.75),
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