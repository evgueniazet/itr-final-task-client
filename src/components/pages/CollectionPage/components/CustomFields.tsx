import React, { useState, ChangeEvent } from 'react';

export const CustomFields = ({ collection, item }: any) => {
    const customFields = [];
    const [editedFields, setEditedFields] = useState({});

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        setEditedFields({ ...editedFields, [fieldName]: value });
    };

    const handleSave = () => {
        // setCollection({ ...collection, ...editedFields });
    };

    const renderIntegerField = (fieldName: string, key: string) => {

        return (
            <div key={fieldName}>
                <label>{fieldName}:</label>
                <input onChange={handleChange} type="number" value={item[key]} />
            </div>
        );
    };

    const renderStringField = (fieldName: string, key: string) => {
        return (
            <div key={fieldName}>
                <label>{fieldName}:</label>
                <input onChange={handleChange} type="text" value={item[key]} />
            </div>
        );
    };

    const renderTextField = (fieldName: string, key: string) => {
        return (
            <div key={fieldName}>
                <label>{fieldName}:</label>
                <textarea onChange={handleChange} value={item[key]} />
            </div>
        );
    };

    const renderBooleanField = (fieldName: string, key: string) => {
        
        return (
            <div key={fieldName}>
                <label>{fieldName}:</label>
                <input onChange={handleChange} type="checkbox" checked={item[key]} />
            </div>
        );
    };

    const renderDateField = (fieldName: string, key: string) => {    
        const date = new Date(item[key]);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
    
        return (
            <div key={fieldName}>
                <label>{fieldName}:</label>
                <input onChange={handleChange} type="date" value={formattedDate} />
            </div>
        );
    };
    
    for (const key in collection) {
        if (key.startsWith('custom') && collection[key] !== null) {
            const [, type, num, name] = key.split('_');
            const fixedType = type.slice(0, -1);
            const fieldName = collection[key];

            console.log(num,name);
            

            switch (fixedType) {
                case 'int':
                    customFields.push(renderIntegerField(fieldName, key));
                    break;
                case 'string':
                    customFields.push(renderStringField(fieldName, key));
                    break;
                case 'text':
                    customFields.push(renderTextField(fieldName, key));
                    break;
                case 'boolean':
                    customFields.push(renderBooleanField(fieldName, key));
                    break;
                case 'date':
                    customFields.push(renderDateField(fieldName, key));
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div>
            {customFields}
            <button onClick={handleSave}>Save</button>
        </div>
    );
};
