import { useMutation } from '@apollo/react-hooks';
import { PickupLocationValidationSchema } from '@dnb/common';
import { Modal } from 'components';
import { Form, Formik } from 'formik';
import { PickupLocationForm } from 'forms';
import {
  CreatePickupLocationMutationData,
  CreatePickupLocationMutationInput,
  CREATE_PICKUP_LOCATION_MUTATION,
  EditPickupLocationMutationData,
  EditPickupLocationMutationInput,
  EDIT_PICKUP_LOCATION_MUTATION,
  GetPickupLocationsQueryData,
  GET_PICKUP_LOCATIONS_QUERY,
} from 'gql';
import {
  BasePickupLocation,
  PickupLocation,
  PickupLocationStatus,
} from 'gql/types';
import { keys, pick } from 'lodash';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface PickupLocationFormModalProps {
  isOpened: boolean;
  setOpened(arg: boolean): void;
  editing: PickupLocation | null;
  setEditing(arg: PickupLocation | null): void;
}

const formModel: BasePickupLocation = {
  city: '',
  zipCode: '',
  streetName: '',
  buildingNumber: '',
  status: PickupLocationStatus.UNAVAILABLE,
};

const PickupLocationFormModal = ({
  isOpened,
  setOpened,
  editing,
  setEditing,
}: PickupLocationFormModalProps) => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [createPickupLocation, { loading: isCreating }] = useMutation<
    CreatePickupLocationMutationData,
    CreatePickupLocationMutationInput
  >(CREATE_PICKUP_LOCATION_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:create:success'));
      onModalClose();
    },
    onError: () => {
      toast.error(t('notification:create:error'));
    },
    update: (store, { data }) => {
      const existingLocations = store.readQuery<GetPickupLocationsQueryData>({
        query: GET_PICKUP_LOCATIONS_QUERY,
      });
      const newLocation = data!.createPickupLocation;
      store.writeQuery<GetPickupLocationsQueryData>({
        query: GET_PICKUP_LOCATIONS_QUERY,
        data: {
          getPickupLocationList: [
            newLocation,
            ...(existingLocations?.getPickupLocationList || []),
          ],
        },
      });
    },
  });

  const [updatePickupLocation, { loading: isUpdating }] = useMutation<
    EditPickupLocationMutationData,
    EditPickupLocationMutationInput
  >(EDIT_PICKUP_LOCATION_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:edit:success'));
      onModalClose();
    },
    onError: () => {
      toast.error(t('notification:edit:error'));
    },
  });

  const initialValues = {
    ...formModel,
    ...pick(editing, keys(formModel)),
  };

  const onSubmit = (data: typeof formModel) => {
    if (editing) {
      return updatePickupLocation({
        variables: { editPickupLocationInput: { ...data, _id: editing._id } },
      });
    }
    createPickupLocation({ variables: { createPickupLocationInput: data } });
  };

  const onModalClose = () => {
    formRef?.current?.resetForm();
    setEditing(null);
    setOpened(false);
  };

  return (
    <Modal
      open={isOpened}
      loading={isCreating || isUpdating}
      onClose={onModalClose}
      title={
        editing
          ? t('titles:edit-pickupLocation')
          : t('titles:create-pickupLocation')
      }
      actions={[
        {
          label: t('buttons:cancel'),
          handler: () => onModalClose(),
        },
        {
          label: t('buttons:save'),
          handler: () => formRef?.current?.handleSubmit(),
          primary: true,
          disabled: isCreating || isUpdating,
        },
      ]}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={PickupLocationValidationSchema(t)}
        innerRef={formRef as any}
        enableReinitialize
      >
        {() => (
          <Form>
            <PickupLocationForm />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PickupLocationFormModal;
