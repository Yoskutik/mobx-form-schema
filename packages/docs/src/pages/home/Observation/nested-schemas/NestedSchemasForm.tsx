import React, { useMemo } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, HFlexBox, SchemaInformer, TextField, VFlexBox } from '@components';
import { ContactsSchema, NestedSchemasSchema, RelativeSchema } from './NestedSchemasSchema';

export const NestedSchemasForm = observer(() => {
  const schema = useMemo(() => (
    NestedSchemasSchema.create({
      contacts: ContactsSchema.create({
        email: 'yoskutik@gmail.com',
      }),
      relatives: [
        RelativeSchema.create({
          name: 'Name 1',
          surname: 'Surname 1',
        }),
        RelativeSchema.create({
          name: 'Name 2',
          surname: 'Surname 2',
        }),
      ],
    })
  ), []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    alert(`Is form changed: ${schema.isChanged}`);
  };

  const handleAddClick = action(() => {
    schema.relatives.push(RelativeSchema.create());
  });

  const handleDeleteClick = action((i: number) => {
    schema.relatives.splice(i, 1);
  });

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <b>Contacts</b>
        <TextField schema={schema.contacts} field="email" label="E-mail" />
        <TextField schema={schema.contacts} field="tel" label="Phone number" />

        <HFlexBox style={{ marginTop: 16 }}>
          <b>Relatives</b>
          <Button onClick={handleAddClick} size="s">Add</Button>
        </HFlexBox>

        {schema.relatives.map((it, i) => (
          <VFlexBox key={i} style={{ marginTop: 12 }}>
            <HFlexBox>
              <span>Relative: #{i + 1}</span>
              <Button onClick={() => handleDeleteClick(i)} size="s">
                Delete
              </Button>
            </HFlexBox>
            <TextField schema={it} field="name" label="Name" />
            <TextField schema={it} field="surname" label="Surname" />
          </VFlexBox>
        ))}

        <HFlexBox className="form-footer">
          <Button type="submit">Submit</Button>
          <Button onClick={() => schema.sync()}>Save</Button>
          <Button onClick={() => schema.reset()}>Restore</Button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noErrors />
    </>
  );
})