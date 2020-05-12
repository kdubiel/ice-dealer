import { useMutation, useQuery } from '@apollo/react-hooks';
import { CreateOrderValidationSchema } from '@dnb/common';
import { Grid, useMediaQuery } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Button } from 'components';
import { Form, Formik } from 'formik';
import { BaseOrderForm } from 'forms';
import {
  CreateOrderMutationData,
  CreateOrderMutationInput,
  CREATE_ORDER_MUTATION,
  GetPickupLocationsQueryData,
  GetPickupLocationsQueryVariables,
  GET_PICKUP_LOCATIONS_QUERY,
} from 'gql';
import { PickupLocation } from 'gql/types';
import { mapValues } from 'lodash';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { breakpoints } from 'styles';

interface Props {}

interface OrderForm {
  pickupLocation: string;
  amount: number;
}

const formModel: OrderForm = {
  pickupLocation: '',
  amount: 0,
};

const PopulatedOrderForm = (_props: Props) => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  const isDesktop = useMediaQuery(breakpoints.md, {
    defaultMatches: true,
  });

  const { data } = useQuery<
    GetPickupLocationsQueryData,
    GetPickupLocationsQueryVariables
  >(GET_PICKUP_LOCATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [createOrder, { loading: isCreating }] = useMutation<
    CreateOrderMutationData,
    CreateOrderMutationInput
  >(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success(t('notification:order:success'));
      history.push('/myorders');
    },
    onError: () => {
      toast.error(t('notification:order:error'));
    },
  });

  const onSubmit = ({ amount, pickupLocation }: OrderForm) => {
    createOrder({
      variables: {
        createOrderInput: { amount, pickupLocation },
      },
    });
  };

  const generate = (location: PickupLocation) => {
    const { city, zipCode, streetName, buildingNumber } = mapValues(
      location,
      val => val || ''
    );

    return `${zipCode} ${city} ${streetName} ${buildingNumber}`;
  };

  const getJustify = (index: number) => {
    if (!isDesktop) {
      return 'flex-start';
    }

    return index % 2 === 0 ? 'flex-start' : 'flex-end';
  };

  const getLabelPlacement = (index: number) => {
    if (!isDesktop) {
      return 'end';
    }
    return index % 2 === 0 ? 'end' : 'start';
  };

  if (!data?.getPickupLocationList) {
    return <div></div>;
  }

  return (
    <Formik
      initialValues={{
        ...formModel,
        pickupLocation: data.getPickupLocationList[0]?._id || '',
      }}
      onSubmit={onSubmit}
      innerRef={formRef as any}
      enableReinitialize
      validationSchema={CreateOrderValidationSchema}
    >
      {props => {
        return (
          <Form>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} md={8} lg={6}>
                <BaseOrderForm />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  isLoading={isCreating}
                >
                  {t('buttons:order')}
                </Button>
              </Grid>
              <Grid container justify="space-around">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Miejsce odbioru</FormLabel>
                  <RadioGroup
                    name="pickupLocation"
                    value={props.values.pickupLocation}
                    onChange={props.handleChange}
                  >
                    <Grid container>
                      {data.getPickupLocationList.map((location, index) => (
                        <Grid
                          item
                          container
                          xs={12}
                          md={6}
                          key={location._id}
                          justify={getJustify(index)}
                        >
                          <FormControlLabel
                            value={location._id}
                            control={<Radio />}
                            label={generate(location)}
                            labelPlacement={getLabelPlacement(index)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PopulatedOrderForm;
