interface IBlogCategoryListResponseDto {
    id: string;
    slug: string;
    image: string;
    meta: string;
    title: string;
    status: boolean;
    username: string;
    userNickname: string;
    isFollowing?: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IBlogCategoryListResponseDto
}