import uploadIcon from '../../../assets/icon/gallery.svg';
import { Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import './UploadInput.scss';

const { Dragger } = Upload;

// Define the type for your UploadInput props based on UploadProps
type UploadInputProps = {
	name?: string;
	multiple?: boolean;
	fileList?: UploadFile[];
	beforeUpload?: () => boolean;
	onChange?: (info: UploadChangeParam<UploadFile>) => void;
	accept?: string;
};

const UploadInput = ({
	name,
	multiple,
	fileList,
	beforeUpload,
	onChange,
	accept,
}: UploadInputProps) => (
	<Dragger
		className="dragger"
		style={{ border: '1px dashed #ff4d4f' }}
		name={name}
		multiple={multiple}
		fileList={fileList}
		beforeUpload={beforeUpload}
		onChange={onChange}
		accept={accept}
	>
		<p className="drag-icon">
			<img
				src={uploadIcon}
				alt="upload-icon"
				style={{ width: '30px', height: '30px' }}
			/>
		</p>
		<p className="upload-text">
			<span className="upload-button">Загрузить файл</span> или перетащите файл
		</p>
		<p className="upload-hint">PNG, JPG до 10MB</p>
	</Dragger>
);

export default UploadInput;
