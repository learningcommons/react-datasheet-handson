import {
  DataSheetGrid,
  keyColumn,
  textColumn,
  intColumn,
} from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Operation } from 'react-datasheet-grid/dist/types';


type GroupData = {
  groupIndex: number, // rowIndexに代替できそう
  type: 'GROUP',
  salary: number,
  opened: boolean, //　表示にしか使っていない。CellDataにもたなくていい
  name: string,
}

type ChildData = {
  groupIndex: number; // rowIndexに代替できないか？
  type: "CHILD";
  firstName: string;
  lastName: string;
  salary: number;
  childIndex: number; // 子要素のIndex数の表現、何かmappingIdなどのKeyにする？
  opened?: undefined;
  name?: undefined;
}

export const GroupGrid = () => {

  const data = [
    {
      "name": "Senior Integration Producer",
      "children": [
        {
          "firstName": "Daniella",
          "lastName": "Zulauf",
          "salary": 2793
        },
        {
          "firstName": "Jackie",
          "lastName": "Mraz",
          "salary": 2892
        },
      ]
    },
    {
      "name": "Senior Directives Assistant",
      "children": [
        {
          "firstName": "Lucienne",
          "lastName": "Mohr",
          "salary": 2618
        }
      ]
    },
  ]

  const [groups, setGroups] = useState(data)
  const [openedGroups, setOpenedGroups] = useState<number[]>([])
  
  // Function to toggle group visibility
  const toggleGroup = useCallback((i : number) => {
    setOpenedGroups((opened : number[]) => {
      if (opened.includes(i)) {
        return opened.filter((x : number) => x !== i)
      }
  
      return [...opened, i]
    })
  }, [])
  
  // Flatten version of groups
  const rows = useMemo(() => {
    const result = []
  
    for (let i : number = 0; i < groups.length; i++) {
      result.push({
        groupIndex: i,
        type: 'GROUP',
        salary: groups[i].children.reduce((acc, cur) => acc + (cur.salary ?? 0), 0),
        opened: openedGroups.includes(i),
        name: groups[i].name,
      })
  
      if (openedGroups.includes(i)) {
        for (let j = 0; j < groups[i].children.length; j++) {
          result.push({
            groupIndex: i,
            type: 'CHILD',
            childIndex: j,
            ...groups[i].children[j],
          })
        }
      }
    }
  
    return result
  }, [groups, openedGroups])
  
  
  const handleChange = (newRows, operations : Operation[]) => {
    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        for (const row of newRows.slice(operation.fromRowIndex, operation.toRowIndex)) {
          if (row.type === 'CHILD') {
            groups[row.groupIndex].children[row.childIndex] = {
              firstName: row.firstName,
              lastName: row.lastName,
              salary: row.salary,
            }
          }
        }
      }
  
      if (operation.type === 'CREATE') {
        const groupIndex = newRows[operation.fromRowIndex - 1].groupIndex
        const childIndex = newRows[operation.fromRowIndex - 1].childIndex ?? -1
  
        groups[groupIndex].children = [
          ...groups[groupIndex].children.slice(0, childIndex + 1),
          ...newRows
            .slice(operation.fromRowIndex, operation.toRowIndex)
            .map((row) => ({
              firstName: row.firstName,
              lastName: row.lastName,
              salary: row.salary,
            })),
          ...groups[groupIndex].children.slice(childIndex + 1),
        ]
      }
  
      if (operation.type === 'DELETE') {
        const deletedRows = rows
          .slice(operation.fromRowIndex, operation.toRowIndex)
          .reverse()
  
        for (const deletedRow of deletedRows) {
          if (deletedRow.type === 'CHILD') {
            groups[deletedRow.groupIndex].children.splice(deletedRow.childIndex, 1)
          }
        }
      }
    }
  
    setGroups([...groups])
  }
  
  return (
    <DataSheetGrid
      value={rows}
      onChange={handleChange}
      columns={[
        {
          title: 'Group',
          disabled: ({ rowData }) => rowData.type === 'CHILD',
          isCellEmpty: () => true,
          component: ({ rowData, focus, stopEditing }) => {
            useEffect(() => {
              if (focus) {
                toggleGroup(rowData.groupIndex)
                stopEditing({ nextRow: false })
              }
            }, [focus, rowData.groupIndex, stopEditing])
  
            if (rowData.type === 'CHILD') {
              return null
            }
  
            return (rowData.opened ? '▼' : '▲') + rowData.name
          },
        },
        {
          ...keyColumn('firstName', textColumn),
          title: 'First name',
          disabled: ({ rowData }) => rowData.type === 'GROUP',
        },
        {
          ...keyColumn('lastName', textColumn),
          title: 'Last name',
          disabled: ({ rowData }) => rowData.type === 'GROUP',
        },
        {
          ...keyColumn('salary', intColumn),
          title: 'Salary',
          disabled: ({ rowData }) => rowData.type === 'GROUP',
        },
      ]}
    />
  )
}

