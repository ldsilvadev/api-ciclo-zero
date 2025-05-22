export type ServiceResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    };

export interface Error {
  issues: Issue[] | any[];
}

interface Issue {
  message: string;
  code?: string;
  expected?: string;
  received?: string;
  path?: string[];
}

export default ServiceResponse;
