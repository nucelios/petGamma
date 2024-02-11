import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/image.min.css';

import { SetStateAction, useEffect, useState } from 'react';
import { Button, Collapse, Tabs, Spin, Form, Input, Upload } from 'antd';
import type { UploadFile } from 'antd';
import {
	useDeletePost,
	useGetAllPosts,
	usePostEditPhoto,
	usePostEditText,
	usePostOnePosts,
	usePublishPost,
} from '../../features/queryHooks/queryHooks';
import { IPost, IPostCreation } from '../../interfaces/IPost';
import './AdminPosts.scss';
import { UploadOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export const AdminPost = () => {
	const { data: posts = [], isLoading, refetch } = useGetAllPosts();
	const { mutate: editText } = usePostEditText();
	const { mutate: editPhoto } = usePostEditPhoto();
	const { mutate: postPosts } = usePostOnePosts();
	const { mutate: publishPost } = usePublishPost();
	const { mutate: deletePost } = useDeletePost();
	const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
	const [titleInput, setTitleInput] = useState('');
	const [descriptionInput, setDescriptionInput] = useState('');
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [currentValues, setCurrentValues] = useState<IPost | null>(null);
	const [form] = Form.useForm();
	const [activeTabKey, setActiveTabKey] = useState('1');

	const activePosts = posts.filter((post: IPost) => post.isPublish);
	const inProgressPosts = posts.filter((post: IPost) => !post.isPublish);

	const [renderKey, setRenderKey] = useState(0);

	useEffect(() => {
		setDescriptionInput('');
	}, [activeTabKey]);

	const triggerRender = async () => {
		setRenderKey((prevKey) => prevKey + 1);
		await refetch();
	};

	const handleUpload = async (values: IPostCreation) => {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('description', descriptionInput);
		if (values.image && values.image.fileList) {
			values.image.fileList.forEach((file: UploadFile) => {
				formData.append('image', file.originFileObj as Blob);
			});
		}

		postPosts(formData);
		await triggerRender();
		await setActiveTabKey('2');
	};

	const handlePushed = async (postId: number) => {
		await publishPost(postId);
		await refetch();
		await triggerRender();
		await setActiveTabKey('1');
	};

	const handleEditClick = (postId: number, currentValues: IPost) => {
		setEditMode((prevEditMode) => ({
			...Object.fromEntries(
				Object.keys(prevEditMode).map((key) => [key, false])
			),
			[postId]: true,
		}));

		setCurrentValues(currentValues);
		form.resetFields();
		form.setFieldsValue({
			title: currentValues.title || '',
			description: currentValues.description,
		});
		setDescriptionInput(currentValues.description || ' ');
	};

	const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTitleInput(value);
	};

	const handleUpdateImage = async (
		values: IPost,
		selectedImage: File | null
	) => {
		const formData = new FormData();

		if (selectedImage) {
			formData.append('image', selectedImage);
		}

		formData.append('id', values.id.toString());

		editPhoto(formData);
	};

	const handleSaveClick = async (postId: number) => {
		const formData = new FormData();
		formData.append('title', titleInput || (currentValues?.title ?? ''));
		formData.append(
			'description',
			descriptionInput || (currentValues?.description ?? '')
		);
		formData.append('id', postId.toString());

		await editText(formData);

		setEditMode((prevEditMode) => ({ ...prevEditMode, [postId]: false }));
		await refetch();
		await triggerRender();
	};

	const handleCancelClick = (postId: number) => {
		setEditMode((prevEditMode) => ({ ...prevEditMode, [postId]: false }));
	};

	const renderPostContent = (post: IPost) => {
		if (editMode[post.id]) {
			return (
				<div>
					<Form onFinish={() => handleSaveClick(post.id)} form={form}>
						<Form.Item label="Название" name="title" initialValue={post.title}>
							<Input onChange={handleTitleInput} value={titleInput} />
						</Form.Item>
						<Form.Item
							label="Описание"
							name="description"
							initialValue={post.description}
						>
							<FroalaEditor
								onModelChange={(model: SetStateAction<string>) => {
									setDescriptionInput(model);
								}}
								model={descriptionInput}
							/>
						</Form.Item>
						<Form.Item label="Фото" name="image">
							<div>
								<Upload
									name="image"
									listType="picture"
									beforeUpload={(file) => {
										setSelectedImage(file as File);
										return false;
									}}
								>
									<Button icon={<UploadOutlined />}>Выберите файлы</Button>
								</Upload>
								<Button onClick={() => handleUpdateImage(post, selectedImage)}>
									Сохранить фото
								</Button>
							</div>
						</Form.Item>
						<Form.Item>
							<Button type="primary" onClick={() => handleSaveClick(post.id)}>
								Сохранить
							</Button>

							<Button type="default" onClick={() => handleCancelClick(post.id)}>
								Отмена
							</Button>
						</Form.Item>
					</Form>
				</div>
			);
		}

		return (
			<div className="posts-block-item">
				<FroalaEditorView model={post.description} />
				<div>
					<Button onClick={() => handleEditClick(post.id, post)}>Edit</Button>
					<Button onClick={() => deletePost(post.id)}>Delete</Button>
				</div>
			</div>
		);
	};

	const items = [
		{
			key: '1',
			label: 'Опубликованные посты',
			children: (
				<div>
					{activePosts.map((post: IPost) => (
						<Collapse key={post.id}>
							<Panel key={post.id} header={post.title}>
								{renderPostContent(post)}{' '}
								<img
									key={`image-${post.id}`}
									alt={post.title}
									src={`${import.meta.env.VITE_API_URL}/uploads/${post.image}`}
									className="posts-block-item-image"
								/>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '2',
			label: 'Неопубликованные посты',
			children: (
				<div>
					{inProgressPosts.map((post: IPost) => (
						<Collapse key={post.id}>
							<Panel key={post.id} header={post.title}>
								{renderPostContent(post)}{' '}
								<img
									key={`image-${post.id}`}
									alt={post.title}
									src={`${import.meta.env.VITE_API_URL}/uploads/${post.image}`}
									className="posts-block-item-image"
								/>
								<br />
								<Button
									type="primary"
									htmlType="submit"
									onClick={() => handlePushed(post.id)}
								>
									Опубликовать
								</Button>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '3',
			label: 'Добавить пост',
			children: (
				<div>
					<Form
						name="file-upload-form"
						layout="vertical"
						onFinish={handleUpload}
					>
						<Form.Item
							label="Название"
							name="title"
							rules={[{ required: true, message: 'Введите название' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item label="Описание" name="description">
							<FroalaEditor
								onModelChange={(model: SetStateAction<string>) => {
									setDescriptionInput(model);
								}}
								model={descriptionInput}
							/>
						</Form.Item>

						<Form.Item
							label="Фото"
							name="image"
							rules={[
								{
									required: true,
									message: 'Выберите хотя бы одну фотографию!',
								},
							]}
						>
							<Upload
								name="image"
								listType="picture"
								beforeUpload={() => false}
							>
								<Button icon={<UploadOutlined />}>Выберите файлы</Button>
							</Upload>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Добавить пост
							</Button>
						</Form.Item>
					</Form>
				</div>
			),
		},
	];

	if (isLoading) {
		return <Spin className={'spinner'} size="large" />;
	}
	return (
		<div key={renderKey}>
			<Tabs
				activeKey={activeTabKey}
				defaultActiveKey="1"
				items={items}
				onChange={(key) => setActiveTabKey(key)}
			/>
		</div>
	);
};
