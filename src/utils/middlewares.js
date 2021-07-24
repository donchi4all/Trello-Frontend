import { getToken, getExpiration, setRedirect } from "@/utils/jwt";

// Auth guard
export const requireAuth = (_, __, next) => {
  if (!getToken()) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
};
//
// export const guardChecker = (guards, from, to, lastNext, i) => {
//   let guard = guards[i];
//   if (guards.length === i + 1) {
//     guard(from, to, lastNext);
//   } else {
//     guard(from, to, function(nextArg) {
//       switch (typeof nextArg) {
//         case "undefined":
//           guardChecker = (guards, from, to, lastNext, i + 1);
//           break;
//         case "object":
//           lastNext(nextArg);
//           break;
//         case "boolean":
//           lastNext(nextArg);
//           break;
//         case "string":
//           lastNext(nextArg);
//           break;
//       }
//     });
//   }
// };
//
// export const multiGuard = ListOfGuards => {
//   return function(from, to, next) {
//     this.guardChecker(ListOfGuards, from, to, next, 0);
//   };
// };

export const checkAuth = (to, __, next) => {
  // User must be a visitor to access unauthentcated routes
  // otherwise take him to an authenticated route (e.g. /)
  if (!to.matched.some((record) => record.meta.requireAuth)) {
    if (
      getToken() &&
      getExpiration() &&
      Date.now() < parseInt(getExpiration())
    ) {
      next({ path: "/" });
    } else {
      next();
    }
  }
  // User must be authenticated to access auth routes
  // else redirect them to login page
  else if (to.matched.some((record) => record.meta.requireAuth)) {
    if (
      getToken() &&
      getExpiration() &&
      Date.now() < parseInt(getExpiration())
    ) {
      next();
    } else {
      // set the current path to local storage before redirecting to login
      setRedirect(to.path);
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
};
