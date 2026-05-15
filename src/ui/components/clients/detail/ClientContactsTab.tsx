import { useContactModal } from "@/ui/hooks/clients/useContactModal";
import { NewContactModal } from "@/ui/components/clients/NewContactModal";
import type { Contact } from "@/domain/contact/contact.entity";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Mail, Pencil, Phone, Star, Trash2, UserPlus } from "lucide-react";

interface ClientContactsTabProps {
    contacts: Contact[];
    loading: boolean;
    isAdmin: boolean;
    clientId: string;
    onDeleteContact: (contactId: string) => void;
    onUpdateMainStatus: (contactId: string) => void;
    onContactSaved: () => void;
}

export function ClientContactsTab({
    contacts,
    loading,
    isAdmin,
    clientId,
    onDeleteContact,
    onUpdateMainStatus,
    onContactSaved,
}: ClientContactsTabProps) {
    const { contactModalOpen, editingContact, openContactModal, openEditContactModal, closeContactModal } = useContactModal();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Contactos</CardTitle>
                    {isAdmin && (
                        <Button size="sm" onClick={openContactModal} className="gap-1.5">
                            <UserPlus className="size-4" />
                            Añadir contacto
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : contacts.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No hay contactos registrados para este cliente.
                    </p>
                ) : (
                    <ul className="divide-y">
                        {contacts.map((c) => (
                            <li key={c.id.value} className="flex items-start gap-3 py-3 px-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 mt-0.5"
                                    title={c.isMain ? "Contacto principal" : "Marcar como principal"}
                                    onClick={() => onUpdateMainStatus(c.id.value)}
                                >
                                    <Star className={`size-4 ${c.isMain ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                                </Button>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{c.fullName}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                            <Mail className="size-3 shrink-0" />{c.email}
                                        </span>
                                        {c.phoneNumber && (
                                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <Phone className="size-3 shrink-0" />{c.phoneNumber}
                                            </span>
                                        )}
                                        {c.note && (
                                            <span className="text-[11px] text-muted-foreground italic">{c.note}</span>
                                        )}
                                    </div>
                                </div>
                                {isAdmin && (
                                    <div className="flex shrink-0">
                                        <Button variant="ghost" size="icon" onClick={() => openEditContactModal(c)}>
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => onDeleteContact(c.id.value)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>

            <NewContactModal
                open={contactModalOpen}
                onOpenChange={(open) => { if (!open) closeContactModal(); }}
                clientId={clientId}
                contact={editingContact}
                onSuccess={onContactSaved}
            />
        </Card>
    );
}
