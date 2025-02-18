import React from 'react';

type ProductActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
};

const ProductActions: React.FC<ProductActionsProps> = ({ onEdit, onDelete }) => {
    return (
        <>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </>
    );
};

export default ProductActions;