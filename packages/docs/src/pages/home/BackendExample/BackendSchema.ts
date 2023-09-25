import { factory, FormSchema, presentation, watch } from '@yoskutik/mobx-form-schema';

const presentName = (value: string) => value
  .split(' ')
  .map(it => (it ? it[0].toUpperCase() + it.substring(1).toLowerCase() : it))
  .join(' ');

const createConfirmEmail = (_: string, schema: BackendSchema) => schema.email;

const createExtraFeatures = (value: string[]) => new Set(value);

export class BackendSchema extends FormSchema {
  @watch title = '';

  // If received value from backend must be preprocessed before usage,
  //  you can use @factory decorator
  @factory(createExtraFeatures) // or @factory.set
  @watch.set extraFeatures = new Set<string>();

  // If you have to process the value before sending to backend,
  //  you can use @presentation decorator
  @presentation(presentName)
  @watch name = '';

  @watch email = '';

  // With @presentation decorator you can even entirely cut off the value
  //  from the form presentation, which can be used as backend request body.
  @presentation.hidden
  @factory(createConfirmEmail)
  @watch confirmEmail = '';
}
