import Quill, { Delta } from 'quill';
// import Image from 'quill/formats/image';
const Image = Quill.import('formats/image');
const InlineBlot = Quill.import('blots/block');

// export default class ImageBlot extends InlineBlot {
//   static create(data) {
//     debugger;
//     console.log(data);
//     const node = super.create(data);
//     node.setAttribute('data-src', data.src);
//     node.setAttribute('src', data.src);
//     node.setAttribute('data-custom', data.custom);
//     console.log(node);
//     return node;
//   }
//   static value(domNode) {
// 		const { src, custom } = domNode.dataset;
// 		return { src, custom };
// 	}
// }

export default class ImageBlot extends Image {
  static create(value) {
    debugger;
    if (typeof value == 'string') {
      return super.create(value);
    } else {
      value.setAttribute('data-src', value.src);
      return value;
    }
  }

  static value(domNode) {
    return domNode;
  }
}


