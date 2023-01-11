import page from "./page.module.scss";
import lead from "./lead.module.scss";
import { useEffect, useState, useCallback } from "react";
import { useAuth, ACTIONS } from "../context/UserCtx";
import { Button } from "../components/button/Button";
import { API } from "../misc/api";
export const LeadsPage = (props) => {
  const { state, dispatch } = useAuth();
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      try {
        const { data: leads } = await API.get("/lead", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });
        setLeads(() => leads);
        //bring lead statuses for select element
        // sessionStorage.setItem("leads", JSON.stringify(leads));
      } catch (error) {
        //console.log(error);
        console.log(error.response.data || error.message);
      }
    }, 0);
  }, [state.user.token]);
  const handleUpdate = useCallback(async () => {}, []);
  return (
    <div className={page.page}>
      <div className={lead.container}>
        <div className={lead.lead}>
          <div className={`${lead.field} ${lead.name}`}>Name:</div>
          <div className={`${lead.field} ${lead.phone}`}>Phone:</div>
          <div className={`${lead.field} ${lead.email}`}>Email:</div>
          <div className={`${lead.field} ${lead.date}`}>Event Date:</div>
          <div className={`${lead.field} ${lead.location}`}>Location:</div>
          <div className={`${lead.field} ${lead.status}`}>Lead status:</div>
        </div>
        {leads.length ? (
          leads.map((ld) => (
            <div className={lead.lead} key={ld.id}>
              <div className={`${lead.field} ${lead.name}`}>{ld.name}</div>
              <div className={`${lead.field} ${lead.phone}`}>{ld.phone}</div>
              <div className={`${lead.field} ${lead.email}`}>{ld.email}</div>
              <div className={`${lead.field} ${lead.date}`}>
                {ld.event_date}
              </div>
              <div className={`${lead.field} ${lead.location}`}>
                {ld.location}
              </div>
              <div className={`${lead.field} ${lead.status}`}>
                {ld.LeadStatus}
              </div>
              <button onClick={handleUpdate}>Update</button>
            </div>
          ))
        ) : (
          <div>No leads to show</div>
        )}
      </div>
    </div>
  );
};
