import 'quill'

export interface Config {
  container: string
  unit: 'word'|'char'
}

export interface QuillInstance {
  on: any
  getText: any
  getSelection()
}

export default class ImageInsert {
  quill: QuillInstance
  options: Config

  constructor(quill, options) {
    this.quill = quill
    this.options = options

    const container = document.querySelector(this.options.container)

    // this.quill.on('text-change', () => {
    //   const length = this.calculate()

    //   container.innerHTML = length + ' ' + 'từ'
    // })
    var range = this.quill.getSelection();
    // container.addEventListener("click", function(){
    //   debugger;
    //   var range = this.quill.getSelection();
    //   var value = prompt('What is the image URL');
    //   // if(value){
    //   //     this.quill.insertEmbed(range.index, 'image', value, value);
    //   // }
    // });
  }


}