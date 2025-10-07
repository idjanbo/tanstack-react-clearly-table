import React from 'react'

interface TitleCellProps {
    children: React.ReactNode
}

const TitleCell: React.FC<TitleCellProps> = ({ children }) => (
    <div className="px-4 py-3">{children}</div>
)

export default TitleCell