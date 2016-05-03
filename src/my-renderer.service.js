const THREE = require('three')

const width = 600
const height = 600

class MyRenderer {
  constructor (rootRenderer) {
    this.rootRenderer = rootRenderer
  }

  selectRootElement (selector, debugInfo) {
    console.log('selectRootElement', selector, debugInfo)
    const element = document.querySelector(selector)
    const canvasElement = this.rootRenderer.renderer.domElement
    this.rootRenderer.renderer.setSize(width, height)
    element.innerHTML = ''
    element.appendChild(canvasElement)

    canvasElement.addEventListener('click', (event) => {
      const camera = this.rootRenderer.camera
      if (event.target === this.rootRenderer.renderer.domElement) {
        const rect = event.target.getBoundingClientRect()
        const mouseX = ((event.clientX - rect.left) / width) * 2 - 1
        const mouseY = -((event.clientY - rect.top) / height) * 2 + 1
        const vector = new THREE.Vector3(mouseX, mouseY, 1)
        vector.unproject(camera)
        const ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize())
        const obj = ray.intersectObjects(this.rootRenderer.targetObjects)
        obj.forEach((item) => {
          this.rootRenderer.clickEventHandlers.get(item.object)()
        })
      }
    })

    const render = () => {
      window.requestAnimationFrame(render)
      for (const f of this.rootRenderer.tickEventHandlers) {
        f()
      }
      this.rootRenderer.renderer.render(this.rootRenderer.scene, this.rootRenderer.camera)
    }
    render()
    return this.rootRenderer.scene
  }

  createElement (parentElement, name, debugInfo) {
    console.log('createElement', parentElement, name, debugInfo)
    const geometry = new THREE.Geometry()
    let node
    switch (name) {
      case 'three-mesh':
        node = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial())
        break
      case 'three-points':
        node = new THREE.Points(geometry, new THREE.PointsMaterial())
        break
      default:
        throw new Error('unknown element')
    }
    if (parentElement) {
      parentElement.add(node)
    }
    return node
  }

  createViewRoot (hostElement) {
    console.log('createViewRoot', hostElement)
    return hostElement
  }

  createTemplateAnchor (parentElement, debugInfo) {
    console.log('createTemplateAnchor', parentElement, debugInfo)
    return {parent: parentElement}
  }

  createText (parentElement, value, debugInfo) {
    console.log('createText', parentElement, value, debugInfo)
    return value
  }

  projectNodes (parentElement, nodes) {
    console.log('projectNodes', parentElement, nodes)
  }

  attachViewAfter (node, viewRootNodes) {
    console.log('attachViewAfter', node, viewRootNodes)
    viewRootNodes.forEach((viewRootNode) => {
      node.parent.add(viewRootNode)
    })
  }

  detachView (viewRootNodes) {
    console.log('detachView', viewRootNodes)
  }

  destroyView (hostElement, viewAllNodes) {
    console.log('destroyView', hostElement, viewAllNodes)
  }

  listen (renderElement, name, callback) {
    console.log('listen', renderElement, name, callback)
    switch (name) {
      case 'click':
        this.rootRenderer.targetObjects.push(renderElement)
        this.rootRenderer.clickEventHandlers.set(renderElement, callback)
        return () => {}
      case 'tick':
        this.rootRenderer.tickEventHandlers.push(callback)
        return () => {}
      default:
        throw new Error('unknown event')
    }
  }

  listenGlobal (target, name, callback) {
    console.log('listenGlobal', target, name, callback)
    return () => {}
  }

  setElementProperty (renderElement, propertyName, propertyValue) {
    // console.log('setElementProperty', renderElement, propertyName, propertyValue)
    Object.assign(renderElement[propertyName], propertyValue)
  }

  setElementAttribute (renderElement, attributeName, attributeValue) {
    console.log('setElementAttribute', renderElement, attributeName, attributeValue)
  }

  setBindingDebugInfo (renderElement, propertyName, propertyValue) {
    console.log('setBindingDebugInfo', renderElement, propertyName, propertyValue)
  }

  setElementClass (renderElement, className, isAdd) {
    console.log('setElementClass', renderElement, className, isAdd)
  }

  setElementStyle (renderElement, styleName, styleValue) {
    console.log('setElementStyle', renderElement, styleName, styleValue)
  }

  invokeElementMethod (renderElement, methodName, args) {
    console.log('involeElementMethod', renderElement, methodName, args)
  }

  setText (renderNode, text) {
    console.log('setText', renderNode, text)
  }
}

module.exports = class MyRootRenderer {
  constructor () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.targetObjects = []
    this.clickEventHandlers = new Map()
    this.tickEventHandlers = []
    this.camera.position.z = 5
  }

  renderComponent (componentProto) {
    return new MyRenderer(this)
  }
}
