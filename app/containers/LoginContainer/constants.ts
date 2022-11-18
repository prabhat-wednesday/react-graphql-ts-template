import { translate } from '@app/components/IntlGlobalProvider';

export const getStepperLoginFormInputConstants = () => [
  {
    label: 'label_username',
    name: 'username',
    rules: [{ message: translate('msg_for_username'), required: true }]
  },
  {
    label: 'label_emailId',
    name: 'emailId',

    rules: [
      { message: translate('msg_for_emailid'), required: true },
      { validateTrigger: 'onSubmit', type: 'email' }
    ]
  },
  {
    label: 'label_password',
    name: 'password',
    rules: [{ message: translate('msg_for_password'), required: true }]
  }
];
