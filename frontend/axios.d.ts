// types.d.ts or axios.d.ts
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean; // Tells TS that `skipAuth` is a valid optional property
  }
}