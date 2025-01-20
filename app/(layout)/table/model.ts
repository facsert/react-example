
class Node {
  constructor(
    public id: number = 0,
    public number: string = '',
  
    public host: string = '',
    public port: number = 0,
    public username: string = '',
    public password: string = '',
  
    public msg: string = '',
  ) {}
}
export { Node };
