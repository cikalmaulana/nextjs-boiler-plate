"use client"

import emitter from "@/lib/function/global.emitter";
import CE_Button from "@/lib/ui/button"
import CE_ModalConfirmation from "@/lib/ui/modal.confirmation";
import CE_ModalInfo from "@/lib/ui/modal.info";
import { useState } from "react";

export default function CE_HomeMain(){
    const [isModalOpen, setModalOpen] = useState(false)
    const [isModalConfirmOpen, setModalConfirmOpen] = useState(false)

    const doOpenToast = (type: string) => {
        emitter.emit("toast", {
            success: true,
            label: "Open " + type + " success!",
            autoclose: true,
            autoclosetime: 5,
        })
    }

    return (
        <>
            <div className="flex flex-col w-full min-h-screen items-center justify-center">
                Home Main
                <div className="flex flex-row gap-2">
                    <CE_Button label="Login" color="primary" disable={false} onClick={() => doOpenToast("login")}/>
                    <CE_Button label="Register" color="secondary" disable={false} onClick={() => doOpenToast("register")}/>
                    <CE_Button label="Open Modal Info" color="primary" disable={false} onClick={() => setModalOpen(true)}/>
                    <CE_Button label="Open Modal Confirm" color="secondary" disable={false} onClick={() => setModalConfirmOpen(true)}/>
                </div>
            </div>
            <CE_ModalInfo 
                title="Modal Test" 
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero odio, lobortis eget ex non, interdum volutpat purus. Donec congue sit amet risus at mollis. Nulla justo elit, convallis eget ultricies vitae, viverra in nisl. Proin vulputate justo elementum, accumsan ipsum eu, posuere leo. In ultrices augue id varius lobortis. Sed ac efficitur justo, eget porta risus. Phasellus et neque ut velit imperdiet vehicula. Aliquam erat volutpat. Vestibulum auctor dictum odio vitae tempor. Ut sit amet dictum ligula. Aliquam erat volutpat. Sed blandit pellentesque ex, porttitor pellentesque neque interdum sit amet. Vivamus nisi sem, volutpat et porttitor vitae, sagittis imperdiet massa. Morbi sed tempor sem. Pellentesque nec tincidunt leo. In quis aliquam lacus.

Morbi suscipit viverra quam et gravida. Nam sed odio placerat, fermentum velit vel, viverra diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut quis ex justo. Vivamus ornare eu dui ut consectetur. Nullam molestie a erat laoreet pulvinar. Aliquam nec purus id purus dapibus pharetra vitae eget orci. Fusce elit mi, tincidunt vel ligula nec, bibendum varius erat.

Pellentesque congue elit eget maximus fermentum. Sed fermentum egestas finibus. Nunc laoreet pellentesque augue, vitae ultrices urna interdum eget. Donec turpis mauris, elementum in nunc vel, posuere dapibus est. In nunc lectus, cursus a rhoncus quis, volutpat varius lorem. Suspendisse ornare molestie purus at accumsan. Phasellus pretium ipsum sit amet ipsum tempus, sit amet egestas risus venenatis."
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(!isModalOpen)} 
                isSuccess={false} 
            />
            <CE_ModalConfirmation 
                title="Modal Test" 
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero odio, lobortis eget ex non, interdum volutpat purus. Donec congue sit amet risus at mollis. Nulla justo elit, convallis eget ultricies vitae, viverra in nisl. Proin vulputate justo elementum, accumsan ipsum eu, posuere leo. In ultrices augue id varius lobortis. Sed ac efficitur justo, eget porta risus. Phasellus et neque ut velit imperdiet vehicula. Aliquam erat volutpat. Vestibulum auctor dictum odio vitae tempor. Ut sit amet dictum ligula. Aliquam erat volutpat. Sed blandit pellentesque ex, porttitor pellentesque neque interdum sit amet. Vivamus nisi sem, volutpat et porttitor vitae, sagittis imperdiet massa. Morbi sed tempor sem. Pellentesque nec tincidunt leo. In quis aliquam lacus.

Morbi suscipit viverra quam et gravida. Nam sed odio placerat, fermentum velit vel, viverra diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut quis ex justo. Vivamus ornare eu dui ut consectetur. Nullam molestie a erat laoreet pulvinar. Aliquam nec purus id purus dapibus pharetra vitae eget orci. Fusce elit mi, tincidunt vel ligula nec, bibendum varius erat.

Pellentesque congue elit eget maximus fermentum. Sed fermentum egestas finibus. Nunc laoreet pellentesque augue, vitae ultrices urna interdum eget. Donec turpis mauris, elementum in nunc vel, posuere dapibus est. In nunc lectus, cursus a rhoncus quis, volutpat varius lorem. Suspendisse ornare molestie purus at accumsan. Phasellus pretium ipsum sit amet ipsum tempus, sit amet egestas risus venenatis."
                isOpen={isModalConfirmOpen} 
                onClose={() => setModalConfirmOpen(false)} 
                onCancel={() => {
                    setModalConfirmOpen(false)
                    emitter.emit("toast", {
                        success: true,
                        label: "Decline modal confirmation",
                        autoclose: true,
                        autoclosetime: 5,
                    })
                }} 
                onAccept={() => {
                    emitter.emit("toast", {
                        success: true,
                        label: "Accept modal confirmation",
                        autoclose: true,
                        autoclosetime: 5,
                    })
                }}
                icon="success" 
            />
        </>
    )
}