export class FileDropper {
  private maskElement: HTMLElement | null = null

  constructor(private element: HTMLElement, private callback: (file: File) => void) {
    this.init()
  }

  private init(): void {
    // Create and append mask element
    this.createMask()

    // Show mask when file is dragged over the element
    this.element.addEventListener('dragover', (event) => {
      event.preventDefault()
      this.showMask()
    })
  }

  private createMask(): void {
    // Create mask element with a message
    this.maskElement = document.createElement('div')
    this.maskElement.style.position = 'absolute'
    this.maskElement.style.top = '0'
    this.maskElement.style.left = '0'
    this.maskElement.style.width = '100%'
    this.maskElement.style.height = '100%'
    this.maskElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    this.maskElement.style.color = 'white'
    this.maskElement.style.display = 'flex'
    this.maskElement.style.justifyContent = 'center'
    this.maskElement.style.alignItems = 'center'
    this.maskElement.style.fontSize = '20px'
    this.maskElement.style.zIndex = '1000'
    this.maskElement.textContent = 'Uploading File'
    this.maskElement.style.display = 'none' // Initially hidden

    this.element.style.position = 'relative' // Ensure the element can contain the absolute mask
    this.element.appendChild(this.maskElement)

    // Hide mask and handle file drop when file is dropped on the mask
    this.maskElement.addEventListener('drop', (event) => {
      event.preventDefault()
      this.hideMask()

      const files = event.dataTransfer?.files
      if (files && files.length > 0) {
        const file = files[0]
        if (file.name.endsWith('.xlsx')) {
          this.callback(file)
        } else {
          console.error('Only .xlsx files are accepted')
        }
      }
    })

    // Hide mask when file is dragged out of the mask
    this.maskElement.addEventListener('dragleave', () => {
      this.hideMask()
    })
  }

  private showMask(): void {
    if (this.maskElement) this.maskElement.style.display = 'flex'
  }

  private hideMask(): void {
    if (this.maskElement) this.maskElement.style.display = 'none'
  }
}
