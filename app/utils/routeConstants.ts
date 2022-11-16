export type RouteConstant = {
  route: string;
  exact?: boolean;
  isProtected?: boolean;
  props?: object;
};

const routeConstants: Record<string, RouteConstant> = {
  itune: {
    route: '/',
    exact: true,
    isProtected: true
  },
  song: {
    route: '/song/:trackId',
    exact: true,
    isProtected: true
  },
  login: {
    route: '/login',
    exact: true,
    isProtected: false
  }
};

export type RouteKeys = keyof typeof routeConstants;

export default routeConstants;
