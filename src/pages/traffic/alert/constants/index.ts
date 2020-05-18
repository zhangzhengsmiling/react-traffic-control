export enum levelEnum {
  URGENT,
  SERIOUS,
  NORMAL,
  SLIGHT,
}

export const levelMap = new Map([
  [levelEnum.URGENT, '紧急'],
  [levelEnum.SERIOUS, '严重'],
  [levelEnum.NORMAL, '一般'],
  [levelEnum.SLIGHT, '轻微'],
])

export const levelColorMap = new Map([
  [levelEnum.URGENT, 'rgb(174, 0, 0)'],
  [levelEnum.SERIOUS, 'rgb(255, 88, 9)'],
  [levelEnum.NORMAL, 'rgb(0, 114, 227)'],
  [levelEnum.SLIGHT, 'rgb(255, 243, 238)'],
])

