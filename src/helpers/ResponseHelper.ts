import jwt from "jsonwebtoken";

interface ResponseData {
  success: boolean;
  message: string;
  errors: Error | string[] | null;
  data: any; 
}

interface UserData {
  id: string,
  nama: string,
  username: string,
  role: string,
}

interface ExtractedToken {
  token: any | null;
  error: string | null;
}

export const ResponseData = (success: boolean, message: string, error: Error | string[] | null, data: any): ResponseData => ({
  success,
  message,
  errors: error && typeof error === "string" ? [error] : error || null,
  data,
});

export const GenerateToken = (data: UserData): string => {
  const token = jwt.sign(data, process.env.APP_SECRET as string, { expiresIn: "1h" });
  return token;
};

export const ExtractToken = (token: string): ExtractedToken => {
  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET as string);
    return { token: decodedToken, error: null };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return { token: null, error: "Token sudah expired, Harap perbarui token" };
    } else {
      console.error("Token verification failed:", error.message);
      return { token: null, error: "Gagal memverifikasi token" };
    }
  }
};
