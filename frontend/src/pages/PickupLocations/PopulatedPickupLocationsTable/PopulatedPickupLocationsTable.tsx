import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  DeletePickupLocationMutationData,
  DeletePickupLocationMutationInput,
  DELETE_PICKUP_LOCATION_MUTATION,
  GetPickupLocationsQueryData,
  GetPickupLocationsQueryVariables,
  GET_PICKUP_LOCATIONS_QUERY,
} from 'gql';
import { PickupLocation } from 'gql/types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { PickupLocationFormModal } from './PickupLocationFormModal';
import { PickupLocationsTable } from './PickupLocationsTable';

interface Props {}

const PopulatedPickupLocationsTable = (_props: Props) => {
  const { t } = useTranslation();
  const [formModalOpened, setFormModalOpened] = useState(false);
  const [editing, setEditing] = useState<PickupLocation | null>(null);

  const { data, loading, refetch } = useQuery<
    GetPickupLocationsQueryData,
    GetPickupLocationsQueryVariables
  >(GET_PICKUP_LOCATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [deletePickupLocation] = useMutation<
    DeletePickupLocationMutationData,
    DeletePickupLocationMutationInput
  >(DELETE_PICKUP_LOCATION_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:delete:success'));
      refetch();
    },
    onError: () => {
      toast.error(t('notification:delete:error'));
    },
  });

  const onCreateClick = () => {
    setFormModalOpened(true);
  };

  const onReadClick = () => {
    refetch();
  };

  const onUpdateClick = (data: PickupLocation) => {
    setEditing(data);
    setFormModalOpened(true);
  };

  const onDeleteClick = ({ _id }: PickupLocation) => {
    deletePickupLocation({ variables: { deletePickupLocationInput: { _id } } });
  };

  return (
    <>
      <PickupLocationFormModal
        isOpened={formModalOpened}
        setOpened={setFormModalOpened}
        editing={editing}
        setEditing={setEditing}
      />
      <PickupLocationsTable
        data={data?.getPickupLocationList || []}
        loading={loading}
        crud={{
          create: onCreateClick,
          read: onReadClick,
          update: onUpdateClick,
          delete: onDeleteClick,
        }}
      />
    </>
  );
};

export default PopulatedPickupLocationsTable;
