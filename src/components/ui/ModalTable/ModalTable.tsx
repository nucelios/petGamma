import { Descriptions, Modal } from 'antd';
import { FC } from 'react';
import { DescriptionsItemType } from 'antd/es/descriptions';

interface Props {
	isModalOpen: boolean;
	closeModal: () => void;
	itemsTable: DescriptionsItemType[] | undefined;
}

const ModalTable: FC<Props> = ({ isModalOpen, closeModal, itemsTable }) => {
	return (
		<>
			<Modal
				open={isModalOpen}
				onCancel={closeModal}
				footer={null}
				style={{ fontFamily: 'Montserrat' }}
			>
				<Descriptions
					layout="vertical"
					items={itemsTable}
					style={{ fontFamily: 'Montserrat' }}
					contentStyle={{ padding: '0 5px' }}
					labelStyle={{ padding: '0 5px' }}
				/>
			</Modal>
		</>
	);
};

export default ModalTable;
