import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface IUseParams {
  searchParams: ReadonlyURLSearchParams;
  router: AppRouterInstance;
  pathname: string;
}

interface IUpdateParamsProp {
  resetPage?: boolean;
  key: string;
  value: string;
}

export const useParamsUtil = ({
  searchParams,
  router,
  pathname,
}: IUseParams) => {
  const getParams = (searchParams: ReadonlyURLSearchParams) => {
    const params: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          (params[key] as string[]).push(value);
        } else {
          params[key] = [params[key] as string, value];
        }
      } else {
        params[key] = value;
      }
    });
    return params;
  };
  const updateParams = (props: IUpdateParamsProp) => {
    const params: any = {
      ...getParams(searchParams),
    };
    if (props.value) {
      params[props.key] = props.value;
    } else {
      if (params[props.key]) delete params[props.key];
    }
    if (props.resetPage) {
      delete params?.page;
      delete params?.sortBy;
      delete params?.sortDir;
    }
    const path = `${pathname}?${new URLSearchParams(params)}`;
    router.push(path);
  };
  return { getParams, updateParams };
};
