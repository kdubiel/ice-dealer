import React from 'react';
import MaterialTable, { MaterialTableProps, Action } from 'material-table';
import { ApolloError } from 'apollo-boost';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

export interface CRUD_Actions<X> {
  create?(): void;
  read?(): void;
  update?(item: X | X[]): void;
  delete?(item: X | X[]): void;
}

interface ApolloTableProps<D extends object> extends MaterialTableProps<D> {
  error?: ApolloError;
  crud?: CRUD_Actions<D>;
}

const mapCRUDToMaterialTableActions = <S extends object>(
  t: TFunction,
  crud?: CRUD_Actions<S>
): Action<S>[] => {
  if (!crud) return [];

  const { create, read, delete: deleteAction, update } = crud;

  const arr: Action<S>[] = [];

  if (create) {
    arr.push({
      icon: 'add',
      tooltip: t('tooltip:add'),
      isFreeAction: true,
      onClick: () => create(),
    });
  }

  if (read) {
    arr.push({
      icon: 'refresh',
      tooltip: t('tooltip:refresh'),
      isFreeAction: true,
      onClick: () => read(),
    });
  }

  if (deleteAction) {
    arr.push({
      icon: 'delete',
      tooltip: t('tooltip:delete'),
      onClick: (_: Event, data: S | S[]) => {
        deleteAction(data);
      },
    });
  }

  if (update) {
    arr.push({
      icon: 'edit',
      tooltip: t('tooltip:edit'),
      onClick: (_: Event, data: S | S[]) => {
        update(data);
      },
    });
  }

  return arr;
};

const ApolloTable = <T extends object>({
  crud,
  actions,
  ...otherProps
}: ApolloTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <MaterialTable
      {...otherProps}
      localization={{
        body: {
          emptyDataSourceMessage: t(
            'material_table:body:emptyDataSourceMessage'
          ),
        },
        toolbar: {
          searchTooltip: t('material_table:toolbar:searchTooltip'),
          searchPlaceholder: t('material_table:toolbar:searchPlaceholder'),
          nRowsSelected: t('material_table:toolbar:nRowsSelected'),
          exportTitle: t('material_table:toolbar:exportTitle'),
          exportName: t('material_table:toolbar:exportName'),
        },
        pagination: {
          labelDisplayedRows: t('material_table:pagination:labelDisplayedRows'),
          labelRowsSelect: t('material_table:pagination:labelRowsSelect'),
          firstTooltip: t('material_table:pagination:firstTooltip'),
          previousTooltip: t('material_table:pagination:previousTooltip'),
          nextTooltip: t('material_table:pagination:nextTooltip'),
          lastTooltip: t('material_table:pagination:lastTooltip'),
        },
        header: {
          actions: '',
        },
      }}
      actions={[
        ...(actions ? actions : []),
        ...mapCRUDToMaterialTableActions<T>(t, crud),
      ]}
    />
  );
};

export default ApolloTable;
