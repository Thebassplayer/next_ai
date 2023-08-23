export interface useUpdatePostPropsRefresh {
  postId: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  refresh: true;
  redirectRoutePath?: never; // This property must not be present
}

export interface useUpdatePostPropsRedirect {
  postId: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  refresh: false; // This property must not be present
  redirectRoutePath: string;
}

export type useUpdatePostProps =
  | useUpdatePostPropsRefresh
  | useUpdatePostPropsRedirect;

export interface useDeletePostPropsRefresh {
  refresh: true;
  redirectRoutePath?: never; // This property must not be present
}
export interface useDeletePostPropsRedirect {
  refresh: false; // This property must not be present
  redirectRoutePath: string;
}

export type useDeletePostProps =
  | useDeletePostPropsRefresh
  | useDeletePostPropsRedirect;
