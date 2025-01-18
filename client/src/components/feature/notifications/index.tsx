import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import transactionsService from "../../../services/transactions.service";
import { useCheckAuth } from "../../../hooks/auth/useCheckAuth";
import { ITransactionResponse } from "../../../models/responses/TransactionResponse";
import { Box, List, ListItem } from "@mui/material";
import { Button } from "../button";

export const Notifications = () => {
  const [requests, setRequests] = useState<Array<ITransactionResponse>>([]);
  const { user } = useCheckAuth();

  useEffect(() => {
    const load = async () => {
      if (user) {
        const id = "company_id" in user ? user.company_id : user.user_id;
        const transactions = await transactionsService.getTransactionsByDonor(
          id
        );
        setRequests(transactions);
      }
    };
  }, [user]);
  return (
    <div className={styles.notifications}>
      <List>
        {requests.map((item) => (
          <ListItem key={item.transaction_id}>
            <Box>
              <span>{item.transaction_id}</span>
              <span>{new Date(item.created_at).toLocaleString()}</span>
            </Box>
            <Button
              onClick={() => {
                transactionsService.updateTransactionStatus(
                  item.transaction_id,
                  "completed"
                );
              }}
            >
              Հաստատել
            </Button>
            <Button
              onClick={() => {
                transactionsService.updateTransactionStatus(
                  item.transaction_id,
                  "cancelled"
                );
              }}
            >
              Մերժել
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
