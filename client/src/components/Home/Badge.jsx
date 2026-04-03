import React from 'react'
import { Zap } from 'lucide-react'

const Badge = () => {
    return (
        <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 rounded-full px-6 py-1.5">
            <Zap width={14} />
            <span>Simple Process</span>
        </div>
    );
}

export default Badge
