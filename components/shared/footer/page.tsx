export default function Footer() {
    return (
        <footer className="bg-gray-100 text-center py-4 dark:bg-neutral-800">
            <p className="text-sm text-gray-500 dark:text-neutral-400">
                © {new Date().getFullYear()} TextUtils. All rights reserved.
            </p>
        </footer>
    )
}
