import Quill, { Delta } from 'quill';

const Embed = Quill.import('blots/block/embed');

export class TaskerFigure extends Embed {

  public static blotName = 'taskerFigure';
  public static tagName = 'figure';

  static value(domNode): any {
    debugger;
    const taskerImage = domNode.querySelector('.lazy-image');
    const taskerCaption = domNode.querySelector('.caption');
    if (taskerImage && taskerCaption) {
      // return super.value(domNode);
      return {
        url: taskerImage.src,
        name: taskerCaption.innerText
      };
     } else {
      return {};
     }
  }

  static create(value) {
    const node = super.create(value);
    // node.setAttribute('contenteditable', false);
    // node.style.fontSize = '0';
    // node.classList.add('tasker-figure');

    const image = document.createElement('img');
    image.setAttribute('src', value.url);

    image.classList.add('lazy-image');

    image.dataset.normalUrl = value;
    // image.dataset.smallUrl = value;
    // image.dataset.originalUrl = value;

    // image.dataset.normalPath = value;
    // image.dataset.smallPath = value;
    // image.dataset.originalPath = value;

    node.appendChild(image);

    const caption = document.createElement('figcaption');
    caption.innerText = value.name;
    caption.classList.add('caption');
  
    node.appendChild(caption);

    return node;
  }

  format(format: any, value: any) {
    if (format === 'tasker-caption') {
      this.domNode.querySelector('.tasker-caption').innerText = value;
    }
  }
}
