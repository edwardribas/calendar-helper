### Calendário em JavaScript

Se trata de uma aplicação console em JavaScript que tem o intuito de facilitar o desenvolvimento de calendários no formato Grid.

A aplicação leva em consideração o ano informado pela chamada da função e um grid 7x6, o qual contabiliza 42 células. Ele mostra o dia inicial do mês, a posição do grid que vai ficar, na onde o mês termina e muitos outros auxiliadores.

Veja abaixo algumas das informações que são retornadas pela função:

<br>

| Propriedade  | Tipo   |
|--------|--------|
| year   | number |
| month  | string |
| firstDayName  | string |
| lastDayName  | string |
| daysAmount  | number |
| gridInformation  |  object|

<br>

Valores que estão contidos dentro da propriedades `gridInformation`.

<br>


| Grid Info  | Tipo   |
|--------|--------|
| gridStartsAt   | number |
| gridEmptySlots  | number |
| gridStartEmptySlots  | object |
| gridEndEmptySlots  | object |

<br>

Valores que estão contidos dentro das propriedades `startEmptyGridItems` e `endEmptyGridItems`.

<br>


| Grid Empty Items  | Tipo   |
|--------|--------|
| amount   | number |
| fillValues  | string[] |






