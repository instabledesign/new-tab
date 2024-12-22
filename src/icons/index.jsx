import {SvgIcon} from "@mui/material";

export function PrefixIcon(props) {
    return (
        <SvgIcon {...props}>
            <rect x="6" y="14" width="4" height="2" rx="1" fill="#666"/>
            <rect x="12" y="14" width="4" height="2" rx="1" fill="#666"/>
            <text x="19" y="16" fontFamily="system-ui" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333" filter="url(#shadow)">T</text>
        </SvgIcon>
    )
}

export function SuffixIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="6" y="16" fontFamily="system-ui" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333" filter="url(#shadow)">T</text>
            <rect x="13" y="14" width="4" height="2" rx="1" fill="#666"/>
            <rect x="20" y="14" width="4" height="2" rx="1" fill="#666"/>
        </SvgIcon>
    )
}

export function WrapIcon(props) {
    return (
        <SvgIcon {...props}>
            <rect x="5" y="14" width="4" height="2" rx="1" fill="#666"/>
            <text x="14" y="16" fontFamily="system-ui" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333" filter="url(#shadow)">T</text>
            <rect x="20" y="14" width="4" height="2" rx="1" fill="#666"/>
        </SvgIcon>
    )
}

export function WrapTagsIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M6 9 L3 12 L6 15" fill="none" stroke="#666" strokeWidth="1.5"/>
            <text x="12" y="16" fontFamily="system-ui" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333" filter="url(#shadow)">T</text>
            <path d="M18 9 L21 12 L18 15" fill="none" stroke="#666" strokeWidth="1.5"/>
        </SvgIcon>
    )
}

export function LowercaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="5" y="16" fontFamily="system-ui" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333">T</text>
            <path d="M12 9 L15 12 L12 15" fill="none" stroke="#666" strokeWidth="1.5"/>
            <text x="20" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">t</text>
        </SvgIcon>
    )
}

export function UppercaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="5" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">t</text>
            <path d="M10 9 L13 12 L10 15" fill="none" stroke="#666" strokeWidth="1.5"/>
            <text x="18" y="16" fontFamily="system-ui" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#333">T</text>
        </SvgIcon>
    )
}

export function CamelCaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="12" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">cCc</text>
        </SvgIcon>
    )
}

export function SnakeCaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="12" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">a_a</text>
        </SvgIcon>
    )
}

export function KebabCaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="12" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">a-a</text>
        </SvgIcon>
    )
}

export function PascalCaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="12" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">Aa</text>
        </SvgIcon>
    )
}

export function DotCaseIcon(props) {
    return (
        <SvgIcon {...props}>
            <text x="12" y="16" fontFamily="system-ui" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#333">a.a</text>
        </SvgIcon>
    )
}

