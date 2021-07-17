class AppError {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number = 200) {
      this.message = message;
      this.statusCode = statusCode;
  }
}

export default AppError;
