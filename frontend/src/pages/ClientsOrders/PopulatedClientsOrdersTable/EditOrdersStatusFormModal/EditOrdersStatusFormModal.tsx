import { useMutation } from '@apollo/react-hooks';
import { OrderStatusValidationSchema } from '@dnb/common';
import { Modal } from 'components';
import { Form, Formik } from 'formik';
import { ExtendedOrderForm } from 'forms';
import {
  UpdateOrdersStatusMutationData,
  UpdateOrdersStatusMutationInput,
  UPDATE_ORDERS_STATUS_MUTATION,
} from 'gql';
import { Order, OrderStatus } from 'gql/types';
import moment from 'moment';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { downloadObjectsAsCsv, mapOrdersToCsvData } from 'utils';

interface PickupLocationFormModalProps {
  editing: Order[] | null;
  setEditing(arg: Order[] | null): void;
  onUpdateSuccess(): void;
}

const EditOrdersStatusFormModal = ({
  editing,
  setEditing,
  onUpdateSuccess,
}: PickupLocationFormModalProps) => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [updateOrdersStatus, { loading }] = useMutation<
    UpdateOrdersStatusMutationData,
    UpdateOrdersStatusMutationInput
  >(UPDATE_ORDERS_STATUS_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:update:success'));
      onModalClose();
      onUpdateSuccess();
    },
    onError: () => {
      toast.error(t('notification:update:error'));
    },
  });

  const initialValues = {
    status: OrderStatus.AWAITING,
    download: true,
  };

  const onSubmit = ({ status, download }: typeof initialValues) => {
    if (!editing) {
      throw new Error();
    }

    if (download) {
      downloadObjectsAsCsv(
        mapOrdersToCsvData(editing, t),
        `zamowienia_${moment().format('YYYY-MM-DD_HH:mm:ss')}.csv`
      );
    }

    const ordersIds = editing.map(({ _id }) => _id);

    updateOrdersStatus({
      variables: {
        updateOrdersStatusInput: {
          status,
          orders: ordersIds,
        },
      },
    });
  };

  const onModalClose = () => {
    formRef?.current?.resetForm();
    setEditing(null);
  };

  return (
    <Modal
      open={!!editing}
      loading={loading}
      onClose={onModalClose}
      title={t('titles:edit-order-status')}
      actions={[
        {
          label: t('buttons:cancel'),
          handler: () => onModalClose(),
        },
        {
          label: t('buttons:save'),
          handler: () => formRef?.current?.handleSubmit(),
          primary: true,
          disabled: loading,
        },
      ]}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={OrderStatusValidationSchema}
        innerRef={formRef as any}
        enableReinitialize
      >
        {() => (
          <Form>
            <ExtendedOrderForm ordersCount={editing?.length || 0} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditOrdersStatusFormModal;
