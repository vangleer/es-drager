import bg1 from '../assets/images/bg1.jpg'
import bg2 from '../assets/images/bg2.jpg'
import bg3 from '../assets/images/bg3.jpg'
import bg4 from '../assets/images/bg4.jpg'

export const templateList = [
  { title: 'ISTJ - 检查员', desc1: '内向 (I)、感觉 (S)、思维 (T)、判断 (J)', desc2: '严谨负责、传统守信、注重细节、务实可靠。', bg: bg1 },
  { title: 'ISFJ - 保护者', desc1: '内向 (I)、感觉 (S)、情感 (F)、判断 (J)', desc2: '温暖关怀、忠诚友善、服务他人、安静稳重。', bg: bg2 },
  { title: 'INFJ - 倡导者', desc1: '内向 (I)、直觉 (N)、情感 (F)、判断 (J)', desc2: '富有同情心、理想主义、有远见、深刻且内省。', bg: bg3 },
  { title: 'INTJ - 建筑师', desc1: '内向 (I)、直觉 (N)、思维 (T)、判断 (J)', desc2: '独立思考、战略规划、创新求知、自信决断。', bg: bg4 },
]

export function getTemplate(item: any) {
  const index = templateList.findIndex(t => t.title === item.title)
  const textColor = index < 2 ? '#333' : '#fff'
  return [
    {
      "id": "es-drager-1736922068461-5",
      "component": "img",
      "props": {
        "src": item.bg,
        "width": 200,
        "loaded": true
      },
      "width": 830,
      "height": 420,
      "left": 183,
      "top": 110,
      "angle": 0,
      "selected": false,
      "editable": true
    },
    {
      "component": "span",
      "text": item.title,
      "style": {
        "fontSize": "3em",
        "color": textColor,
        "fontWeight": "bold"
      },
      "width": 367,
      "height": 64,
      "equalProportion": false,
      "left": 183.4998779296875,
      "top": 151,
      "id": "es-drager-1736922181523-16",
      "selected": false,
      "angle": 0,
      "editable": true
    },
    {
      "component": "span",
      "text": item.desc1,
      "style": {
        "fontSize": 18,
        "color": textColor
      },
      "width": 313.00000000000006,
      "height": 39.999999999999986,
      "equalProportion": false,
      "left": 261.5001220703125,
      "top": 254.5000457763672,
      "id": "es-drager-1736922312187-38",
      "selected": false,
      "angle": 0,
      "editable": true
    },
    {
      "component": "span",
      "text": item.desc2,
      "style": {
        "fontSize": 18,
        "color": textColor
      },
      "width": 370.00000000000006,
      "height": 39.999999999999986,
      "equalProportion": false,
      "left": 261.00006103515625,
      "top": 317,
      "id": "es-drager-1736922480592-63",
      "selected": false,
      "angle": 0,
      "editable": true
    },
    {
      "component": "span",
      "text": `0${index + 1}`,
      "style": {
        "fontSize": "200px",
        "color": "rgba(255, 255, 255, 1)",
        "fontWeight": "bold",
        "opacity": 0.4
      },
      "width": 241,
      "height": 159,
      "equalProportion": false,
      "left": 772.5001220703125,
      "top": 371.0000915527344,
      "id": "es-drager-1736925918497-2",
      "selected": false,
      "angle": 0,
      "editable": false
    }
  ]
}