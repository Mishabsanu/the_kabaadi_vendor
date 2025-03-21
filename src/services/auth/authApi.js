import { canimApi } from "../canim";

const authApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // Sign Up
    signUp: builder.mutation({
      query: (body) => ({
        url: "/vendor/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vendor"],
    }),

    // Sign In
    signIn: builder.mutation({
      query: (body) => ({
        url: "/vendor/auth/signin",
        method: "POST",
        body,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/vendor/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // Persist Login
    persistLogin: builder.query({
      query: () => ({
        url: "/vendor/get-auth-vendor",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Vendor"],
    }),

    // Add Route Plan (Fixed)
    addRoutePlan: builder.mutation({
      query: (body) => ({
        url: "/vendor/add-route-plan",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
  useAddRoutePlanMutation,
} = authApi;
