export class Node {
	// SVG elements
	public node: SVGGElement
	private circle: SVGCircleElement
	private name: SVGTextElement

	// Public node properties
	public x: number
	public y: number
	public id: string

	// Private node properties
	private state: string
	private distance: number
	private finished: boolean
	private previous: Node | null
	private edges: any[]

	public static nodeCount: number = 0
	public static nodeDragged: Node | null = null

	constructor(x: number, y: number, name: string = '') {
		Node.nodeCount++

		this.x = x
		this.y = y

		// Create node container
		this.node = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		this.node.setAttributeNS(null, 'class', 'full-node')

		// Create node circle
		this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		this.circle.setAttributeNS(null, 'class', 'node')
		this.circle.setAttributeNS(null, 'id', `node_${name ? name : Node.nodeCount}`)
		this.circle.setAttributeNS(null, 'cx', String(this.x))
		this.circle.setAttributeNS(null, 'cy', String(this.y))

		// Create node name
		this.name = document.createElementNS('http://www.w3.org/2000/svg', 'text')
		this.name.setAttributeNS(null, 'x', String(this.x))
		this.name.setAttributeNS(null, 'y', String(this.y - 22))
		this.name.setAttributeNS(null, 'alignment-baseline', 'after-edge')
		this.name.setAttributeNS(null, 'for-node', name ? name : String(Node.nodeCount))
		this.name.textContent = name ? name : String(Node.nodeCount)

		// Append elements to node container
		this.node.appendChild(this.circle)
		this.node.appendChild(this.name)

		// Set node properties
		this.id = `node_${name ? name : Node.nodeCount}`
		this.state = 'unvisited'
		this.distance = Infinity
		this.finished = false
		this.previous = null
		this.edges = []
	}

	public startMove(): void {
		this.circle.classList.add('grabbed')
	}

	public move(x: number, y: number): void {
		this.x = x
		this.y = y

		this.circle.setAttributeNS(null, 'cx', String(this.x))
		this.circle.setAttributeNS(null, 'cy', String(this.y))

		this.name.setAttributeNS(null, 'x', String(this.x))
		this.name.setAttributeNS(null, 'y', String(this.y - 22))
	}

	public endMove(): void {
		this.circle.classList.remove('grabbed')
	}
}