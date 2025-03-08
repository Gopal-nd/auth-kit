import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useServerUser } from '@/hooks/use-server-user'
import React from 'react'

const Server = async() => {
    const user = await useServerUser()
  return (
    <Table>
    <TableCaption>User Session in Server side.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Key</TableHead>
        <TableHead>Value</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      
        <TableRow >
          <TableCell className="font-medium">Email</TableCell>
          <TableCell>{user?.email}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell className="font-medium">Name</TableCell>
          <TableCell>{user?.name}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell className="font-medium">Id</TableCell>
          <TableCell>{user?.id}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell className="font-medium">Role</TableCell>
          <TableCell>{user?.role}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell className="font-medium">2FA</TableCell>
          <TableCell>{user?.isTwoFactorEnabled ? 'ON':"OFF"}</TableCell>
        </TableRow>
    </TableBody>
  </Table>
  )
}

export default Server