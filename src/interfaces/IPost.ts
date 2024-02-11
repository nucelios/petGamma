import { UploadFile } from 'antd';

export interface IPost {
	id: number;
	title: string;
	description: string;
	image: string;
	isPublish: boolean;
	publicationDate: string | null;
}

export interface IPostCreation extends Pick<IPost, 'title' | 'description'> {
	image: {
		fileList: UploadFile[];
	};
}
