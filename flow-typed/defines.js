
declare module './config/jdbc.yaml' {
  declare module.exports: any;
}

declare type HttpParam = {
  url: string,
  encoding?: string,
}

declare type CarCols = {
  vid: string,
  oem: string,
  name: string,
  update_time: number,
  thumb: string,
  create_time: number,
  type_name?: string,
}
