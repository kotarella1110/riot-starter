# Todo

## Functionality

Quickly add a todo to a list, and strike them off when you're done.

## Usage

`<todo>` supports the following custom tag attributes:

| attribute | type | description |
| --- | --- | --- |
| `title` | String | Name of the todo list. |
| `items` | Array _optional_ | List of todo items with `title` ( String ) and `done` state ( Boolean ) and `hidden` state ( Boolean ). E.g. `[{ title:'Alpha' }, { title:'Beta', done:true }, { title:'Omega', hidden:true }]`. |