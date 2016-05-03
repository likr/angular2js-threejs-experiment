const {Component} = require('angular2/core')
const THREE = require('three')

const size = 5

module.exports = Component({
  selector: 'my-app',
  template: `
    <three-mesh
      *ngFor="let box of boxes"
      [geometry]="wrap(box.geometry)"
      [material]="wrap(box.material)"
      [position]="wrap(box.position)"
      [rotation]="wrap(box.rotation)"
      (click)="handleClick(box)"
      (tick)="updateBox(box)">
    </three-mesh>
    <three-points
      (tick)="updatePoints()"
      [geometry]="wrap(pointsGeometry)"
      [material]="wrap(pointsMaterial)">
    </three-points>
  `
})(class AppComponent {
  constructor () {
    this.boxes = [
      {
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.7}),
        position: new THREE.Vector3(-3, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0)
      },
      {
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.7}),
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0)
      },
      {
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshBasicMaterial({color: 0x0000ff, transparent: true, opacity: 0.7}),
        position: new THREE.Vector3(3, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0)
      }
    ]
    this.pointsGeometry = new THREE.Geometry()
    this.pointsMaterial = new THREE.PointsMaterial({
      vertexColors: THREE.VertexColors,
      size: 0.1
    })
    for (let i = 0; i < 10000; ++i) {
      const position = new THREE.Vector3(Math.random() * size - size / 2, Math.random() * size - size / 2, 0)
      this.pointsGeometry.vertices.push(position)
      const color = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`)
      this.pointsGeometry.colors.push(color)
    }
  }

  updateBox (box) {
    const hsl = box.material.color.getHSL()
    box.material.color.setHSL(hsl.h + 0.01, hsl.s, hsl.l)
    box.rotation.x += 0.1
    box.rotation.y += 0.1
  }

  updatePoints () {
    for (const vertex of this.pointsGeometry.vertices) {
      vertex.x += 0.1
      vertex.y += 0.1
      if (vertex.x > size / 2) {
        vertex.x = -size / 2
      }
      if (vertex.y > size / 2) {
        vertex.y = -size / 2
      }
    }
    this.pointsGeometry.verticesNeedUpdate = true
  }

  handleClick (box) {
    box.material.opacity = box.material.opacity === 1 ? 0.7 : 1
  }

  wrap (arg) {
    return Object.assign({}, arg)
  }
})
