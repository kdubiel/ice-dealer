import { useMutation } from '@apollo/react-hooks';
import {
  BaseUserFormSchema,
  ExtendedUserFormSchema,
  PasswordValidationSchema,
} from '@dnb/common';
import { Modal } from 'components';
import { Form, Formik } from 'formik';
import { BaseUserForm, ExtendedUserForm, PasswordForm } from 'forms';
import {
  CreateUserMutationData,
  CreateUserMutationInput,
  CreateUserMutationVariables,
  CREATE_USER_MUTATION,
  UserData,
  EditUserMutationData,
  EditUserMutationInput,
  EditUserMutationVariables,
  EDIT_USER_MUTATION,
  GetUsersQueryData,
  GET_USERS_LIST_QUERY,
} from 'gql';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { pick, keys, isEmpty, omitBy } from 'lodash';
import { toast } from 'react-toastify';

interface Props {
  userModalOpened: boolean;
  setUserModalOpened(p: boolean): void;
  editing: UserData | null;
  setEditing(p: UserData | null): void;
}

type FormModel = CreateUserMutationVariables;

const formModel: FormModel = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirm_password: '',
  role: 'CLIENT',
  status: 'NEW',
};

const UserFormModal = ({
  userModalOpened,
  setUserModalOpened,
  editing,
  setEditing,
}: Props) => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [createUser, { loading: isCreatingUser }] = useMutation<
    CreateUserMutationData,
    CreateUserMutationInput
  >(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:create:success'));
      onClose();
    },
    onError: () => {
      toast.error(t('notification:create:error'));
    },
    update: (store, { data }) => {
      const existingUsers = store.readQuery<GetUsersQueryData>({
        query: GET_USERS_LIST_QUERY,
      });
      const newUser = data!.createUser;
      store.writeQuery<GetUsersQueryData>({
        query: GET_USERS_LIST_QUERY,
        data: {
          getUsersList: [newUser, ...(existingUsers?.getUsersList || [])],
        },
      });
    },
  });

  const [editUser, { loading: isEditingUser }] = useMutation<
    EditUserMutationData,
    EditUserMutationInput
  >(EDIT_USER_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:edit:success'));
      onClose();
    },
    onError: () => {
      toast.error(t('notification:edit:error'));
    },
  });

  const onSubmit = (data: FormModel) => {
    if (editing) {
      const { password, confirm_password, ...requiredData } = data;
      const filteredPasswords = omitBy({ password, confirm_password }, isEmpty);
      return onEditUser({
        ...requiredData,
        _id: editing._id,
        ...filteredPasswords,
      });
    }
    onCreateUser(data);
  };

  const onCreateUser = (createUserInput: CreateUserMutationVariables) => {
    createUser({ variables: { createUserInput } });
  };

  const onEditUser = (data: EditUserMutationVariables) => {
    editUser({
      variables: { editUserInput: { ...data, _id: editing?._id || '' } },
    });
  };

  const onClose = () => {
    resetForm();
    setEditing(null);
    setUserModalOpened(false);
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const initialValues: FormModel = {
    ...formModel,
    ...pick(editing, keys(formModel)),
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal
      open={userModalOpened}
      loading={isCreatingUser || isEditingUser}
      onClose={onClose}
      title={editing ? t('titles:edit-user') : t('titles:create-user')}
      actions={[
        {
          label: t('buttons:cancel'),
          handler: () => onClose(),
        },
        {
          label: t('buttons:save'),
          handler: () => handleFormSubmit(),
          primary: true,
          disabled: isCreatingUser || isEditingUser,
        },
      ]}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={() =>
          BaseUserFormSchema()
            .concat(ExtendedUserFormSchema())
            .concat(PasswordValidationSchema(t))
        }
        innerRef={formRef as any}
        enableReinitialize
      >
        {() => (
          <Form>
            <BaseUserForm />
            <PasswordForm required={!editing} />
            <ExtendedUserForm />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserFormModal;
