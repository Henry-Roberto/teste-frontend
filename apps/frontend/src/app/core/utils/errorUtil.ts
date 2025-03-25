export class ErrorUtil {
  static handleError(messagem: string, err: any) {
    console.error(messagem, err);
    alert(messagem);
  }
}